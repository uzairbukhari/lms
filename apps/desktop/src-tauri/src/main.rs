// Learning Adventures: a thin Windows shell around the live site (docs/DESKTOP_APP.md).
// The site itself is the React app, so lessons and fixes arrive with a normal deploy. This shell adds:
//   * a window that can only show our own site (no address bar, tabs or devtools),
//   * an offline page, a parent-PIN to close focus mode, and over-the-air updates of the shell itself.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs, path::PathBuf, sync::atomic::{AtomicBool, Ordering}, time::Duration};
use tauri::{AppHandle, Manager, Url, WebviewUrl, WebviewWindowBuilder, WindowEvent};
use tauri_plugin_updater::UpdaterExt;

/// The live site. Override with LMS_SITE for local testing, e.g. http://localhost:8787.
const DEFAULT_SITE: &str = "https://lms.sipwise.trade";
/// Hosts the window may navigate to besides the site itself (the login page's Turnstile check).
const EXTRA_HOSTS: &[&str] = &["challenges.cloudflare.com"];
/// Full screen with a PIN to exit. Turn on by setting LMS_FOCUS=1 or creating focus.flag in the app data folder.
const UPDATE_EVERY: Duration = Duration::from_secs(6 * 60 * 60);

static FOCUS: AtomicBool = AtomicBool::new(false);
static ALLOW_EXIT: AtomicBool = AtomicBool::new(false);

fn site() -> Url {
    let raw = std::env::var("LMS_SITE").unwrap_or_else(|_| DEFAULT_SITE.to_string());
    Url::parse(&raw).unwrap_or_else(|_| Url::parse(DEFAULT_SITE).expect("default site is valid"))
}

fn allowed(url: &Url, site: &Url) -> bool {
    if url.scheme() == "tauri" || url.host_str() == Some("tauri.localhost") || url.scheme() == "about" {
        return true;
    }
    if url.host_str() == site.host_str() && url.scheme() == site.scheme() {
        // Parents use the browser for admin; the children's app never shows the admin pages.
        return !(url.path().starts_with("/admin") || url.path().starts_with("/api/admin"));
    }
    url.scheme() == "https" && url.host_str().map_or(false, |h| EXTRA_HOSTS.contains(&h))
}

fn data_dir(app: &AppHandle) -> PathBuf {
    let dir = app.path().app_data_dir().unwrap_or_else(|_| std::env::temp_dir());
    let _ = fs::create_dir_all(&dir);
    dir
}

/// A random id for this PC, so the admin can see which PCs are up to date. Contains no personal data.
fn device_id(app: &AppHandle) -> String {
    let path = data_dir(app).join("device-id");
    if let Ok(id) = fs::read_to_string(&path) {
        let id = id.trim().to_string();
        if id.len() >= 8 {
            return id;
        }
    }
    let id = uuid::Uuid::new_v4().to_string();
    let _ = fs::write(&path, &id);
    id
}

async fn reachable(site: &Url) -> bool {
    let Ok(health) = site.join("/api/health") else { return false };
    let Ok(client) = reqwest::Client::builder().timeout(Duration::from_secs(8)).build() else { return false };
    client.get(health).send().await.map(|r| r.status().is_success()).unwrap_or(false)
}

fn show_offline(app: &AppHandle) {
    if let Some(win) = app.get_webview_window("main") {
        let _ = win.navigate(Url::parse("tauri://localhost/offline.html").unwrap_or_else(|_| site()));
    }
}

#[tauri::command]
async fn retry(app: AppHandle) -> bool {
    let site = site();
    if reachable(&site).await {
        if let Some(win) = app.get_webview_window("main") {
            let _ = win.navigate(site);
        }
        true
    } else {
        false
    }
}

/// Called by the bundled PIN page. The PIN is checked on our server, so it can be changed without a new installer.
#[tauri::command]
async fn submit_pin(app: AppHandle, pin: String) -> bool {
    let Ok(url) = site().join("/api/desktop/exit") else { return false };
    let ok = match reqwest::Client::new().post(url).json(&serde_json::json!({ "pin": pin })).send().await {
        Ok(r) => r.status().is_success(),
        Err(_) => false,
    };
    if ok {
        ALLOW_EXIT.store(true, Ordering::SeqCst);
        app.exit(0);
    }
    ok
}

#[tauri::command]
fn cancel_pin(app: AppHandle) {
    if let Some(win) = app.get_webview_window("pin") {
        let _ = win.close();
    }
}

fn open_pin_window(app: &AppHandle) {
    if let Some(win) = app.get_webview_window("pin") {
        let _ = win.set_focus();
        return;
    }
    let _ = WebviewWindowBuilder::new(app, "pin", WebviewUrl::App("pin.html".into()))
        .title("Parent PIN")
        .inner_size(340.0, 260.0)
        .resizable(false)
        .minimizable(false)
        .maximizable(false)
        .always_on_top(true)
        .center()
        .build();
}

async fn check_for_update(app: AppHandle) {
    let device = device_id(&app);
    let endpoint = format!(
        "{}api/desktop/update/{{{{target}}}}-{{{{arch}}}}/{{{{current_version}}}}?device={}",
        site().join("/").map(|u| u.to_string()).unwrap_or_default(),
        device
    );
    let Ok(endpoint) = Url::parse(&endpoint.replace("%7B", "{").replace("%7D", "}")) else { return };
    let Ok(builder) = app.updater_builder().endpoints(vec![endpoint]) else { return };
    let Ok(updater) = builder.build() else { return };
    if let Ok(Some(update)) = updater.check().await {
        // Downloads in the background; Windows installs it quietly (passive mode) and the app restarts.
        if update.download_and_install(|_, _| {}, || {}).await.is_ok() {
            app.restart();
        }
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            if let Some(win) = app.get_webview_window("main") {
                let _ = win.unminimize();
                let _ = win.set_focus();
            }
        }))
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .invoke_handler(tauri::generate_handler![retry, submit_pin, cancel_pin])
        .setup(|app| {
            let handle = app.handle().clone();
            let site = site();
            let focus = std::env::var("LMS_FOCUS").map(|v| v == "1").unwrap_or(false) || data_dir(&handle).join("focus.flag").exists();
            FOCUS.store(focus, Ordering::SeqCst);

            let nav_site = site.clone();
            let ua = format!("LearningAdventuresDesktop/{}", env!("CARGO_PKG_VERSION"));
            let mut builder = WebviewWindowBuilder::new(app, "main", WebviewUrl::External(site.clone()))
                .title("Learning Adventures")
                .inner_size(1280.0, 800.0)
                .min_inner_size(800.0, 600.0)
                .user_agent(&ua)
                .on_navigation(move |url| allowed(url, &nav_site))
                .on_new_window(|_url, _features| tauri::webview::NewWindowResponse::Deny);
            if focus {
                builder = builder.fullscreen(true).decorations(false).always_on_top(true);
            }
            let main = builder.build()?;

            if focus {
                let app_handle = handle.clone();
                main.on_window_event(move |event| {
                    if let WindowEvent::CloseRequested { api, .. } = event {
                        if !ALLOW_EXIT.load(Ordering::SeqCst) {
                            api.prevent_close();
                            open_pin_window(&app_handle);
                        }
                    }
                });
            }

            // Offline on start-up: show the friendly page instead of a browser error.
            let boot = handle.clone();
            tauri::async_runtime::spawn(async move {
                if !reachable(&site).await {
                    show_offline(&boot);
                }
            });

            // Check for shell updates at start-up and every few hours.
            let upd = handle.clone();
            tauri::async_runtime::spawn(async move {
                loop {
                    check_for_update(upd.clone()).await;
                    tokio::time::sleep(UPDATE_EVERY).await;
                }
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running Learning Adventures");
}
