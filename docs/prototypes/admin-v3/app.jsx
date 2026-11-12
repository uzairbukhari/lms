/* Admin v3 clickable prototype. Sample data only; nothing is saved. Build: see docs/prototypes/admin-v3/build.sh */
const { useState, useMemo, useEffect, useRef } = React;

// ---------- sample data ----------
const SUBJECTS = {
  maths: { name: "Maths", color: "var(--s-maths)" },
  science: { name: "Science", color: "var(--s-science)" },
  gk: { name: "General Knowledge", color: "var(--s-gk)" },
  "data-ai": { name: "CS, Data & AI", color: "var(--s-ai)" },
  english: { name: "English", color: "var(--s-english)" },
};
const TAGS = [
  { id: "t1", kind: "topic", label: "Place value" }, { id: "t2", kind: "topic", label: "Addition" },
  { id: "t3", kind: "topic", label: "Fractions" }, { id: "t4", kind: "topic", label: "Time" },
  { id: "t5", kind: "topic", label: "Habitats" }, { id: "t6", kind: "topic", label: "Plants" },
  { id: "t7", kind: "topic", label: "Algorithms" }, { id: "t8", kind: "topic", label: "Maps" },
  { id: "t9", kind: "skill", label: "Compare" }, { id: "t10", kind: "skill", label: "Reason" },
  { id: "t11", kind: "skill", label: "Predict" },
  { id: "t12", kind: "standard", label: "NC Y2 Ma 2.1", code: "NC-Y2-NPV" },
  { id: "t13", kind: "standard", label: "Cambridge 2Np.01", code: "2Np.01" },
  { id: "t14", kind: "standard", label: "NC Y4 Sc Living", code: "NC-Y4-SC-LT" },
  { id: "t15", kind: "standard", label: "Pakistan SLO M-II-1" },
  { id: "t16", kind: "custom", label: "Hands-on" }, { id: "t17", kind: "custom", label: "Has clip" },
];
const tagById = Object.fromEntries(TAGS.map((t) => [t.id, t]));

const L = (id, title, subject, ageMin, ageMax, status, tags, mins, parts, qs, variantsOk, updated) => ({ id, title, subject, ageMin, ageMax, status, tags, mins, parts, qs, variantsOk, updated });
const LESSONS0 = [
  L("l1", "Place Value to 100", "maths", 6, 7, "published", ["t1", "t12", "t13", "t16", "t17"], 35, 4, 15, true, "2 days ago"),
  L("l2", "Adding 2-Digit Numbers", "maths", 6, 7, "published", ["t2", "t12", "t10"], 40, 4, 15, true, "5 days ago"),
  L("l3", "Number Facts to 20", "maths", 6, 7, "published", ["t2", "t13"], 30, 4, 15, true, "1 week ago"),
  L("l4", "Halves and Quarters", "maths", 6, 8, "draft", ["t3", "t9"], 35, 4, 12, false, "today"),
  L("l5", "Telling the Time", "maths", 6, 8, "published", ["t4", "t16"], 30, 4, 15, true, "3 weeks ago"),
  L("l6", "Big Numbers to 10,000", "maths", 8, 10, "published", ["t1", "t15"], 40, 4, 15, true, "1 week ago"),
  L("l7", "Equivalent Fractions", "maths", 8, 10, "ready", ["t3", "t9", "t10"], 45, 4, 15, true, "yesterday"),
  L("l8", "Coordinates", "maths", 8, 10, "published", ["t8", "t11"], 35, 4, 15, true, "2 weeks ago"),
  L("l9", "Living Things and Habitats", "science", 6, 7, "published", ["t5", "t17"], 35, 4, 15, true, "4 days ago"),
  L("l10", "Plants", "science", 6, 7, "published", ["t6", "t16"], 30, 4, 15, true, "4 days ago"),
  L("l11", "Seasons and Weather", "science", 6, 7, "draft", ["t11"], 30, 4, 9, false, "today"),
  L("l12", "Food Chains", "science", 8, 10, "published", ["t5", "t14", "t11"], 40, 4, 15, true, "1 week ago"),
  L("l13", "Teeth and Digestion", "science", 8, 10, "published", ["t14"], 40, 4, 15, true, "1 week ago"),
  L("l14", "States of Matter", "science", 8, 10, "ready", ["t9", "t16"], 45, 4, 15, true, "2 days ago"),
  L("l15", "Algorithms and Robots", "data-ai", 6, 8, "published", ["t7", "t11", "t17"], 30, 4, 15, true, "6 days ago"),
  L("l16", "Loops", "data-ai", 8, 10, "published", ["t7", "t10"], 35, 4, 15, true, "6 days ago"),
  L("l17", "Data Detectives", "data-ai", 6, 8, "draft", ["t9"], 30, 3, 10, false, "today"),
  L("l18", "Where in the World?", "gk", 6, 8, "published", ["t8"], 30, 4, 15, true, "1 week ago"),
  L("l19", "The Silk Road", "gk", 8, 10, "published", ["t8", "t17"], 40, 4, 15, true, "2 weeks ago"),
  L("l20", "Golden Age of Islam", "gk", 8, 10, "published", ["t10"], 40, 4, 15, true, "2 weeks ago"),
  L("l21", "Sentences and Grammar", "english", 6, 7, "published", ["t10"], 30, 4, 15, true, "1 week ago"),
  L("l22", "Nouns and Verbs", "english", 6, 7, "ready", ["t9"], 30, 4, 15, true, "3 days ago"),
  L("l23", "Persuasive Writing", "english", 9, 10, "draft", ["t10"], 45, 4, 6, false, "today"),
  L("l24", "Mini-beasts", "science", 6, 7, "published", ["t5", "t16"], 30, 4, 15, true, "5 days ago"),
];

const COURSES0 = [
  { id: "c1", title: "Class 1 Maths", subject: "maths", ageMin: 6, ageMax: 7, status: "published", items: [{ sec: "Numbers to 100" }, "l3", "l1", "l2", { sec: "Measures" }, "l5"] },
  { id: "c2", title: "Class 1 Science", subject: "science", ageMin: 6, ageMax: 7, status: "published", items: ["l9", "l24", "l10", "l11"] },
  { id: "c3", title: "Class 4 Maths", subject: "maths", ageMin: 8, ageMax: 10, status: "published", items: ["l6", "l7", "l8"] },
  { id: "c4", title: "Class 4 Science", subject: "science", ageMin: 8, ageMax: 10, status: "published", items: ["l12", "l13", "l14"] },
  { id: "c5", title: "Coding Starters", subject: "data-ai", ageMin: 6, ageMax: 10, status: "draft", items: ["l15", "l16"] },
  { id: "c6", title: "Holiday Revision Pack", subject: null, ageMin: 6, ageMax: 8, status: "draft", items: ["l3", "l5", "l9"] },
];

const STAFF = [
  { id: "u0", name: "Uzair", role: "super", email: "you@family" },
  { id: "u1", name: "Ms Amina", role: "teacher", email: "amina@example.org" },
  { id: "u2", name: "Mr Bilal", role: "teacher", email: "bilal@example.org" },
];
const CLASSES0 = [
  { id: "k1", name: "Class 1", age: "6 to 7", courses: [{ id: "c1", rule: "mastery" }, { id: "c2", rule: "mastery" }, { id: "c5", rule: "open" }], staff: [{ id: "u1", access: "edit" }] },
  { id: "k4", name: "Class 4", age: "9 to 10", courses: [{ id: "c3", rule: "mastery" }, { id: "c4", rule: "drip" }], staff: [{ id: "u1", access: "view" }, { id: "u2", access: "edit" }] },
  { id: "kt", name: "Topic test", age: "any", courses: [{ id: "c1", rule: "open" }], staff: [] },
];
const STUDENTS0 = [
  { id: "s1", name: "Zainab", login: "zainabbukhari", classId: "k1", done: 3, total: 9, last: "today", stuck: null },
  { id: "s2", name: "Fatima", login: "fatimabukhari", classId: "k4", done: 4, total: 6, last: "yesterday", stuck: "Equivalent Fractions (3 tries)" },
  { id: "s3", name: "Test student", login: "testkid", classId: "kt", done: 0, total: 4, last: "2 days ago", stuck: null },
];

const PARTS = [
  { id: "p1", kind: "Learn", title: "Tens and ones", slides: ["What is a ten?", "Ten ones make one ten", "Show 34 with blocks", "Mini quiz"] },
  { id: "p2", kind: "Try", title: "Build the number", slides: ["Drag the blocks", "Which is bigger?", "Mini quiz"] },
  { id: "p3", kind: "Play", title: "Place value race", slides: ["How to play", "Race!", "Mini quiz"] },
  { id: "p4", kind: "Use", title: "At the market", slides: ["Counting money in tens", "Your turn", "Mini quiz"] },
];
const QUESTIONS0 = [
  { id: "q1", type: "Multiple choice", prompt: "How many tens are in 47?", answer: "4", diff: 1, tags: ["t1"], variants: ["How many tens are in 63?", "How many tens are in 85?"], stats: { correct: 92, wrong: "7 (picked by 1 of 3)", time: "11s" } },
  { id: "q2", type: "Drag blocks", prompt: "Build 56 with tens and ones.", answer: "5 tens, 6 ones", diff: 1, tags: ["t1", "t16"], variants: ["Build 38 with tens and ones."], stats: { correct: 75, wrong: "6 tens, 5 ones", time: "24s" } },
  { id: "q3", type: "Compare", prompt: "Which is bigger: 72 or 27?", answer: "72", diff: 2, tags: ["t9"], variants: ["Which is bigger: 81 or 18?", "Which is smaller: 45 or 54?"], stats: { correct: 58, wrong: "27 (picked more than 72 by Class 1)", time: "9s", flag: "confusing" } },
  { id: "q4", type: "Number line", prompt: "Put 50 on the number line from 0 to 100.", answer: "50", diff: 2, tags: ["t1"], variants: ["Put 30 on the number line from 0 to 100.", "Put 80 on the number line from 0 to 100."], stats: { correct: 81, wrong: "40", time: "14s" } },
  { id: "q5", type: "Type the answer", prompt: "What is 3 tens and 9 ones?", answer: "39", diff: 1, tags: ["t1"], variants: ["What is 6 tens and 2 ones?", "What is 9 tens and 0 ones?"], stats: { correct: 97, wrong: "93", time: "8s", flag: "easy" } },
  { id: "q6", type: "Multiple choice", prompt: "Which number has 8 ones and 2 tens?", answer: "28", diff: 3, tags: ["t1", "t10"], variants: [], stats: { correct: 64, wrong: "82", time: "15s" } },
];

// ---------- helpers ----------
const cx = (...a) => a.filter(Boolean).join(" ");
const ages = (a, b) => (a === b ? `Age ${a}` : `Age ${a} to ${b}`);
const STATUS = { published: ["Published", "green"], ready: ["Ready", "blue"], draft: ["Draft", "amber"], archived: ["Archived", "slate"] };
const RULES = { mastery: ["Mastery path", "Next lesson opens at 70% on the big quiz"], open: ["All open", "Every lesson is open"], drip: ["Drip", "One more lesson every 7 days, after the last is passed"] };

function useHash() {
  const [h, setH] = useState(() => location.hash.slice(1) || "home");
  useEffect(() => { const f = () => setH(location.hash.slice(1) || "home"); addEventListener("hashchange", f); return () => removeEventListener("hashchange", f); }, []);
  return [h, (v) => { location.hash = v; }];
}

function Icon({ n, s = 18 }) {
  const P = {
    home: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
    lessons: "M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h6",
    courses: "M4 6h16M4 12h16M4 18h10",
    classes: "M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM22 19v-1a4 4 0 0 0-3-3.9M16 4.1a3 3 0 0 1 0 5.8",
    people: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    tag: "M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8zM7.5 7.5h.01",
    bank: "M9 9h6M9 13h6M9 17h3M5 3h14v18H5z",
    reports: "M4 20V10M10 20V4M16 20v-7M22 20H2",
    settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 15H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9 3.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
    search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
    grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
    plus: "M12 5v14M5 12h14", x: "M18 6L6 18M6 6l12 12", drag: "M9 5h.01M15 5h.01M9 12h.01M15 12h.01M9 19h.01M15 19h.01",
    up: "M18 15l-6-6-6 6", down: "M6 9l6 6 6-6", eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    edit: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z", check: "M20 6L9 17l-5-5", warn: "M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
    lock: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4", sparkle: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z",
    exam: "M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9", copy: "M8 8h12v12H8zM4 16V4h12",
    refresh: "M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5", menu: "M3 6h18M3 12h18M3 18h18",
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={P[n]} /></svg>;
}
const Badge = ({ tone = "slate", children }) => <span className={`badge b-${tone}`}>{children}</span>;
const StatusBadge = ({ s }) => <Badge tone={STATUS[s][1]}>{STATUS[s][0]}</Badge>;
const SubjectDot = ({ s }) => <span className="sdot" style={{ background: SUBJECTS[s]?.color ?? "var(--muted)" }} aria-hidden="true" />;
const Tag = ({ t, onRemove }) => <span className={`tag k-${t.kind}`}>{t.label}{onRemove && <button className="tag-x" aria-label={`Remove tag ${t.label}`} onClick={onRemove}><Icon n="x" s={12} /></button>}</span>;
function Btn({ kind = "default", icon, children, disabled, title, ...p }) {
  return <button className={cx("btn", `btn-${kind}`)} disabled={disabled} title={title} {...p}>{icon && <Icon n={icon} s={16} />}{children}</button>;
}

// ---------- permissions ----------
function perms(viewer, classes) {
  const isSuper = viewer.role === "super";
  const access = (classId) => (isSuper ? "edit" : classes.find((c) => c.id === classId)?.staff.find((s) => s.id === viewer.id)?.access ?? null);
  const myClasses = isSuper ? classes : classes.filter((c) => access(c.id));
  const courseClasses = (courseId) => classes.filter((c) => c.courses.some((x) => x.id === courseId));
  const canEditCourse = (courseId) => isSuper || (courseClasses(courseId).length > 0 && courseClasses(courseId).every((c) => access(c.id) === "edit"));
  return { isSuper, access, myClasses, courseClasses, canEditCourse };
}

// ---------- slide preview (kid themes) ----------
const THEMES = { space: "Space Explorers", candy: "Candy Arcade", sunny: "Sunny Playground", forest: "Storybook Forest" };
function SlidePreview({ title, body, theme = "space", device = "ipad", blocks = 34 }) {
  const tens = Math.floor(blocks / 10), ones = blocks % 10;
  return (
    <div className={cx("device", `d-${device}`)}>
      <div className={cx("kid", `kt-${theme}`)}>
        <div className="kid-top"><span className="kid-pill">Part 1 · Learn</span><span className="kid-pill">2 of 4</span></div>
        <h4 className="kid-title">{title}</h4>
        <p className="kid-body">{body}</p>
        <div className="kid-blocks" role="img" aria-label={`${tens} tens and ${ones} ones`}>
          {Array.from({ length: tens }, (_, i) => <span key={"t" + i} className="ten">{Array.from({ length: 10 }, (_, j) => <i key={j} />)}</span>)}
          <span className="ones">{Array.from({ length: ones }, (_, j) => <i key={j} />)}</span>
        </div>
        <div className="kid-nav"><span className="kid-btn ghost">Back</span><span className="kid-btn">Next</span></div>
      </div>
    </div>
  );
}

// ---------- app ----------
function App() {
  const [route, go] = useHash();
  const [viewerId, setViewerId] = useState("u0");
  const [lessons, setLessons] = useState(LESSONS0);
  const [courses, setCourses] = useState(COURSES0);
  const [classes, setClasses] = useState(CLASSES0);
  const [students, setStudents] = useState(STUDENTS0);
  const [toast, setToast] = useState(null);
  const [nav, setNav] = useState(false);
  const viewer = STAFF.find((s) => s.id === viewerId);
  const P = perms(viewer, classes);
  const say = (m) => { setToast(m); clearTimeout(say.t); say.t = setTimeout(() => setToast(null), 2600); };
  const ctx = { lessons, setLessons, courses, setCourses, classes, setClasses, students, setStudents, P, viewer, go, say };

  const [page, arg] = route.split(/-(.+)/);
  let view;
  if (page === "lessons") view = <Library ctx={ctx} />;
  else if (page === "lesson") view = <LessonEditor key={arg} ctx={ctx} id={arg} />;
  else if (page === "courses") view = <Courses ctx={ctx} />;
  else if (page === "course") view = <CourseBuilder key={arg} ctx={ctx} id={arg} />;
  else if (page === "classes") view = <ClassList ctx={ctx} />;
  else if (page === "class") view = <ClassDetail key={arg} ctx={ctx} id={arg} />;
  else if (page === "people") view = <People ctx={ctx} />;
  else view = <Home ctx={ctx} />;

  const NAVS = [
    { g: null, items: [["home", "Home", "home"]] },
    { g: "Library", items: [["lessons", "Lessons", "lessons"], ["courses", "Courses", "courses"], ["bank", "Question bank", "bank", true], ["tags", "Tags", "tag", true]] },
    { g: "Teaching", items: [["classes", "Classes", "classes"], ["reports", "Reports", "reports", true]] },
    ...(P.isSuper ? [{ g: "Admin", items: [["people", "People and roles", "people"], ["settings", "Settings", "settings", true]] }] : []),
  ];
  const active = { lesson: "lessons", course: "courses", class: "classes" }[page] ?? page;
  return (
    <div className="shell">
      <aside className={cx("side", nav && "open")} aria-label="Main">
        <div className="brand"><span className="logo" aria-hidden="true">L</span><div><b>Learning Adventures</b><small>Admin</small></div></div>
        <nav>
          {NAVS.map((g, i) => (
            <div key={i} className="navg">
              {g.g && <div className="navl">{g.g}</div>}
              {g.items.map(([to, label, ic, soon]) => (
                <a key={to} href={soon ? undefined : "#" + to} onClick={(e) => { if (soon) { e.preventDefault(); say(`${label} is described in the plan; not in this prototype.`); } setNav(false); }} className={cx("navi", active === to && "on", soon && "soon")} aria-current={active === to ? "page" : undefined} role="link" tabIndex={0}>
                  <Icon n={ic} /> {label}{soon && <span className="soon-pill">plan</span>}
                </a>
              ))}
            </div>
          ))}
        </nav>
        <div className="viewer">
          <label htmlFor="viewer" className="navl">Try it as</label>
          <select id="viewer" value={viewerId} onChange={(e) => { setViewerId(e.target.value); go("home"); }}>
            <option value="u0">Uzair · Super admin</option>
            <option value="u1">Ms Amina · Teacher</option>
            <option value="u2">Mr Bilal · Teacher</option>
          </select>
          <small>{P.isSuper ? "Can do everything." : P.myClasses.map((c) => `${c.name}: ${P.access(c.id) === "edit" ? "can edit" : "view only"}`).join(" · ")}</small>
        </div>
      </aside>
      {nav && <div className="scrim" onClick={() => setNav(false)} />}
      <main className="main">
        <div className="topbar">
          <button className="btn btn-ghost menu" aria-label="Open menu" onClick={() => setNav(true)}><Icon n="menu" /></button>
          <div className="search"><Icon n="search" s={16} /><input id="cmdk" placeholder="Jump to a lesson, class or student" aria-label="Jump to" onKeyDown={(e) => { if (e.key === "Enter") { const q = e.target.value.toLowerCase(); const l = lessons.find((x) => x.title.toLowerCase().includes(q)); if (l) go("lesson-" + l.id); } }} /><kbd>Ctrl K</kbd></div>
          <span className="who">{viewer.name}<Badge tone={P.isSuper ? "accent" : "slate"}>{P.isSuper ? "Super admin" : "Teacher"}</Badge></span>
        </div>
        <div className="content">{view}</div>
      </main>
      <div className="toast" role="status" aria-live="polite" hidden={!toast}>{toast}</div>
    </div>
  );
}

function Header({ title, sub, children, back }) {
  return (
    <header className="ph">
      <div className="ph-t">{back && <a className="back" href={"#" + back[0]}>← {back[1]}</a>}<h1>{title}</h1>{sub && <p>{sub}</p>}</div>
      <div className="ph-a">{children}</div>
    </header>
  );
}

// ---------- home ----------
function Home({ ctx }) {
  const { P, students, lessons, classes, courses, go } = ctx;
  const mine = students.filter((s) => P.myClasses.some((c) => c.id === s.classId));
  const drafts = lessons.filter((l) => l.status !== "published" && courses.some((c) => c.items.includes(l.id) && c.status === "published"));
  const checks = lessons.filter((l) => !l.variantsOk);
  return (
    <>
      <Header title={`Good evening, ${ctx.viewer.name}`} sub={P.isSuper ? "Here is what needs you today." : "Your classes at a glance."} />
      <div className="home">
        <section className="panel">
          <h2>Needs you</h2>
          <ul className="todo">
            {mine.filter((s) => s.stuck).map((s) => <li key={s.id}><Badge tone="red">Stuck</Badge><span><b>{s.name}</b> on {s.stuck}</span><Btn kind="ghost" onClick={() => go("class-" + s.classId)}>Open class</Btn></li>)}
            {drafts.map((l) => <li key={l.id}><Badge tone="amber">Draft in course</Badge><span><b>{l.title}</b> is in a published course but children cannot see it yet</span><Btn kind="ghost" onClick={() => go("lesson-" + l.id)}>Review</Btn></li>)}
            {checks.slice(0, 3).map((l) => <li key={"c" + l.id}><Badge tone="amber">Checks</Badge><span><b>{l.title}</b>: some quiz questions have fewer than 2 variants</span><Btn kind="ghost" onClick={() => go("lesson-" + l.id)}>Fix</Btn></li>)}
            <li><Badge tone="blue">Exam</Badge><span><b>Class 4 grand exam</b> is generated and waiting to be published</span><Btn kind="ghost" onClick={() => go("class-k4")}>Open</Btn></li>
          </ul>
        </section>
        <section className="panel">
          <h2>Classes</h2>
          <div className="kcards">
            {P.myClasses.map((c) => {
              const ss = students.filter((s) => s.classId === c.id);
              const pct = ss.length ? Math.round((ss.reduce((a, s) => a + s.done / s.total, 0) / ss.length) * 100) : 0;
              return (
                <a key={c.id} className="kcard" href={"#class-" + c.id}>
                  <div className="row"><b>{c.name}</b>{!P.isSuper && P.access(c.id) === "view" && <Badge>View only</Badge>}</div>
                  <small>{ss.length} {ss.length === 1 ? "student" : "students"} · {c.courses.length} courses · age {c.age}</small>
                  <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${c.name} progress`}><span style={{ width: pct + "%" }} /></div>
                  <small>{pct}% of assigned lessons passed</small>
                </a>
              );
            })}
          </div>
        </section>
        <section className="panel">
          <h2>Library</h2>
          <div className="stats">
            <div><b>{lessons.length}</b><small>lessons</small></div>
            <div><b>{lessons.filter((l) => l.status === "published").length}</b><small>published</small></div>
            <div><b>{courses.length}</b><small>courses</small></div>
            <div><b>{TAGS.length}</b><small>tags</small></div>
          </div>
          <div className="row gap"><Btn kind="primary" icon="plus" onClick={() => go("lessons")}>Browse lessons</Btn><Btn icon="courses" onClick={() => go("courses")}>Build a course</Btn></div>
        </section>
      </div>
    </>
  );
}

// ---------- library ----------
function LessonFilters({ f, setF, courses, classes }) {
  const toggle = (k, v) => setF({ ...f, [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v] });
  const [tq, setTq] = useState("");
  return (
    <div className="filters" aria-label="Filters">
      <fieldset><legend>Subject</legend>
        {Object.entries(SUBJECTS).map(([k, s]) => <label key={k} className="chk"><input type="checkbox" checked={f.subjects.includes(k)} onChange={() => toggle("subjects", k)} /><SubjectDot s={k} />{s.name}</label>)}
      </fieldset>
      <fieldset><legend>Age</legend>
        <div className="age">
          <label>From <select value={f.ageMin} onChange={(e) => setF({ ...f, ageMin: +e.target.value })}>{[5, 6, 7, 8, 9, 10, 11].map((a) => <option key={a}>{a}</option>)}</select></label>
          <label>to <select value={f.ageMax} onChange={(e) => setF({ ...f, ageMax: +e.target.value })}>{[5, 6, 7, 8, 9, 10, 11].map((a) => <option key={a}>{a}</option>)}</select></label>
        </div>
      </fieldset>
      <fieldset><legend>Tags <span className="seg-sm">{["any", "all"].map((m) => <button key={m} className={cx(f.tagMode === m && "on")} onClick={() => setF({ ...f, tagMode: m })} aria-pressed={f.tagMode === m}>{m}</button>)}</span></legend>
        <input className="inp" placeholder="Find a tag" value={tq} onChange={(e) => setTq(e.target.value)} aria-label="Find a tag" />
        <div className="tagpick">{TAGS.filter((t) => t.label.toLowerCase().includes(tq.toLowerCase())).map((t) => <button key={t.id} className={cx("tag", `k-${t.kind}`, f.tags.includes(t.id) && "sel")} aria-pressed={f.tags.includes(t.id)} onClick={() => toggle("tags", t.id)}>{t.label}</button>)}</div>
      </fieldset>
      <fieldset><legend>Status</legend>
        {Object.keys(STATUS).map((k) => <label key={k} className="chk"><input type="checkbox" checked={f.status.includes(k)} onChange={() => toggle("status", k)} />{STATUS[k][0]}</label>)}
      </fieldset>
      <fieldset><legend>Used in</legend>
        <select className="inp" value={f.usedIn} onChange={(e) => setF({ ...f, usedIn: e.target.value })} aria-label="Used in">
          <option value="">Anywhere or nowhere</option><option value="none">Not in any course</option>
          <optgroup label="Course">{courses.map((c) => <option key={c.id} value={"c:" + c.id}>{c.title}</option>)}</optgroup>
          <optgroup label="Class">{classes.map((c) => <option key={c.id} value={"k:" + c.id}>{c.name}</option>)}</optgroup>
        </select>
      </fieldset>
      <fieldset><legend>Quality</legend>
        <label className="chk"><input type="checkbox" checked={f.needsVariants} onChange={() => setF({ ...f, needsVariants: !f.needsVariants })} />Needs quiz variants</label>
      </fieldset>
    </div>
  );
}
const EMPTY_F = { q: "", subjects: [], ageMin: 5, ageMax: 11, tags: [], tagMode: "any", status: [], usedIn: "", needsVariants: false };
function filterLessons(lessons, f, courses, classes) {
  return lessons.filter((l) => {
    if (f.q && !l.title.toLowerCase().includes(f.q.toLowerCase())) return false;
    if (f.subjects.length && !f.subjects.includes(l.subject)) return false;
    if (l.ageMax < f.ageMin || l.ageMin > f.ageMax) return false;
    if (f.tags.length && !(f.tagMode === "any" ? f.tags.some((t) => l.tags.includes(t)) : f.tags.every((t) => l.tags.includes(t)))) return false;
    if (f.status.length && !f.status.includes(l.status)) return false;
    if (f.needsVariants && l.variantsOk) return false;
    if (f.usedIn === "none" && courses.some((c) => c.items.includes(l.id))) return false;
    if (f.usedIn.startsWith("c:") && !courses.find((c) => c.id === f.usedIn.slice(2))?.items.includes(l.id)) return false;
    if (f.usedIn.startsWith("k:")) { const k = classes.find((c) => c.id === f.usedIn.slice(2)); if (!k?.courses.some((x) => courses.find((c) => c.id === x.id)?.items.includes(l.id))) return false; }
    return true;
  });
}
function activeChips(f, setF, courses, classes) {
  const chips = [];
  f.subjects.forEach((s) => chips.push([SUBJECTS[s].name, () => setF({ ...f, subjects: f.subjects.filter((x) => x !== s) })]));
  if (f.ageMin !== 5 || f.ageMax !== 11) chips.push([`Age ${f.ageMin} to ${f.ageMax}`, () => setF({ ...f, ageMin: 5, ageMax: 11 })]);
  f.tags.forEach((t) => chips.push([`${f.tagMode === "all" && f.tags.length > 1 ? "All: " : ""}${tagById[t].label}`, () => setF({ ...f, tags: f.tags.filter((x) => x !== t) })]));
  f.status.forEach((s) => chips.push([STATUS[s][0], () => setF({ ...f, status: f.status.filter((x) => x !== s) })]));
  if (f.usedIn) chips.push([f.usedIn === "none" ? "Not in any course" : f.usedIn.startsWith("c:") ? "In " + courses.find((c) => c.id === f.usedIn.slice(2)).title : "In " + classes.find((c) => c.id === f.usedIn.slice(2)).name, () => setF({ ...f, usedIn: "" })]);
  if (f.needsVariants) chips.push(["Needs variants", () => setF({ ...f, needsVariants: false })]);
  return chips;
}

function Library({ ctx }) {
  const { lessons, setLessons, courses, setCourses, classes, go, say, P } = ctx;
  const [f, setF] = useState({ ...EMPTY_F });
  const [mode, setMode] = useState("grid");
  const [sel, setSel] = useState([]);
  const [peek, setPeek] = useState(null);
  const [showF, setShowF] = useState(false);
  const rows = filterLessons(lessons, f, courses, classes);
  const chips = activeChips(f, setF, courses, classes);
  const usedIn = (id) => courses.filter((c) => c.items.includes(id));
  const toggle = (id) => setSel(sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id]);
  const bulk = (what, val) => {
    if (what === "publish") { setLessons(lessons.map((l) => (sel.includes(l.id) ? { ...l, status: "published" } : l))); say(`${sel.length} lessons published.`); }
    if (what === "tag") { setLessons(lessons.map((l) => (sel.includes(l.id) && !l.tags.includes(val) ? { ...l, tags: [...l.tags, val] } : l))); say(`Tagged ${sel.length} lessons "${tagById[val].label}".`); }
    if (what === "course") { setCourses(courses.map((c) => (c.id === val ? { ...c, items: [...c.items, ...sel.filter((x) => !c.items.includes(x))] } : c))); say(`Added ${sel.length} lessons to ${courses.find((c) => c.id === val).title}.`); }
    setSel([]);
  };
  const views = [["All lessons", EMPTY_F], ["Class 1 drafts", { ...EMPTY_F, ageMin: 6, ageMax: 7, status: ["draft", "ready"] }], ["Needs variants", { ...EMPTY_F, needsVariants: true }], ["Not in a course", { ...EMPTY_F, usedIn: "none" }]];
  return (
    <>
      <Header title="Lessons" sub="Every lesson is independent. Tag it, then add it to as many courses as you like.">
        <Btn icon="plus" kind="primary" onClick={() => say("Import a lesson JSON from Claude, or start a blank lesson.")}>New lesson</Btn>
      </Header>
      <div className="views" role="tablist" aria-label="Saved views">
        {views.map(([n, v]) => <button key={n} role="tab" aria-selected={JSON.stringify(f) === JSON.stringify(v)} className={cx("view", JSON.stringify(f) === JSON.stringify(v) && "on")} onClick={() => setF({ ...v })}>{n}</button>)}
        <button className="view add" onClick={() => say("Saved as a view.")}>+ Save view</button>
      </div>
      <div className="lib">
        <div className={cx("lib-f", showF && "open")}><LessonFilters f={f} setF={setF} courses={courses} classes={classes} /></div>
        <div className="lib-r">
          <div className="toolbar">
            <div className="search grow"><Icon n="search" s={16} /><input id="libq" value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} placeholder="Search lesson titles" aria-label="Search lessons" /></div>
            <Btn className="btn only-narrow" onClick={() => setShowF(!showF)} aria-expanded={showF}>Filters</Btn>
            <div className="seg" role="group" aria-label="Layout">
              <button aria-pressed={mode === "grid"} className={cx(mode === "grid" && "on")} onClick={() => setMode("grid")} aria-label="Grid"><Icon n="grid" s={16} /></button>
              <button aria-pressed={mode === "table"} className={cx(mode === "table" && "on")} onClick={() => setMode("table")} aria-label="Table"><Icon n="list" s={16} /></button>
            </div>
          </div>
          <div className="chips">
            <span className="count">{rows.length} of {lessons.length} lessons</span>
            {chips.map(([label, rm]) => <button key={label} className="chip" onClick={rm} aria-label={`Remove filter ${label}`}>{label} <Icon n="x" s={12} /></button>)}
            {chips.length > 0 && <button className="linkbtn" onClick={() => setF({ ...EMPTY_F, q: f.q })}>Clear all</button>}
          </div>
          {sel.length > 0 && (
            <div className="bulk" role="region" aria-label="Bulk actions">
              <b>{sel.length} selected</b>
              <select aria-label="Add tag" value="" onChange={(e) => e.target.value && bulk("tag", e.target.value)}><option value="">Add tag…</option>{TAGS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}</select>
              <select aria-label="Add to course" value="" onChange={(e) => e.target.value && bulk("course", e.target.value)}><option value="">Add to course…</option>{courses.filter((c) => P.canEditCourse(c.id)).map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}</select>
              {P.isSuper && <Btn onClick={() => bulk("publish")}>Publish</Btn>}
              <button className="linkbtn" onClick={() => setSel([])}>Clear</button>
            </div>
          )}
          {rows.length === 0 && <div className="empty">No lessons match these filters. <button className="linkbtn" onClick={() => setF({ ...EMPTY_F })}>Clear filters</button></div>}
          {mode === "grid" ? (
            <div className="lgrid">
              {rows.map((l) => (
                <article key={l.id} className={cx("lcard", sel.includes(l.id) && "sel")}>
                  <div className="thumb" style={{ "--sc": SUBJECTS[l.subject].color }}>
                    <label className="pick"><input type="checkbox" checked={sel.includes(l.id)} onChange={() => toggle(l.id)} aria-label={`Select ${l.title}`} /></label>
                    <span className="thumb-t">{l.title}</span>
                    <span className="thumb-p">{Array.from({ length: l.parts }, (_, i) => <i key={i} />)}</span>
                  </div>
                  <div className="lc-b">
                    <div className="row sp"><span className="subj"><SubjectDot s={l.subject} />{SUBJECTS[l.subject].name}</span><StatusBadge s={l.status} /></div>
                    <h3><button className="linkbtn strong" onClick={() => setPeek(l)}>{l.title}</button></h3>
                    <div className="meta"><span>{ages(l.ageMin, l.ageMax)}</span><span>{l.parts} parts</span><span>{l.mins} min</span><span>{l.qs} questions</span></div>
                    <div className="tags">{l.tags.slice(0, 4).map((t) => <Tag key={t} t={tagById[t]} />)}{l.tags.length > 4 && <span className="more">+{l.tags.length - 4}</span>}</div>
                    <div className="used">{usedIn(l.id).length ? `In ${usedIn(l.id).map((c) => c.title).join(", ")}` : "Not in any course yet"}</div>
                    {!l.variantsOk && <div className="warnline"><Icon n="warn" s={14} /> Quiz needs variants</div>}
                  </div>
                  <div className="lc-a"><Btn kind="ghost" icon="eye" onClick={() => setPeek(l)}>Quick look</Btn><Btn kind="ghost" icon="edit" onClick={() => go("lesson-" + l.id)}>Open</Btn></div>
                </article>
              ))}
            </div>
          ) : (
            <div className="tablewrap"><table className="tbl">
              <thead><tr><th><span className="sr">Select</span></th><th>Lesson</th><th>Subject</th><th>Age</th><th>Tags</th><th>Status</th><th>Used in</th><th>Updated</th></tr></thead>
              <tbody>{rows.map((l) => (
                <tr key={l.id} className={cx(sel.includes(l.id) && "sel")}>
                  <td><input type="checkbox" checked={sel.includes(l.id)} onChange={() => toggle(l.id)} aria-label={`Select ${l.title}`} /></td>
                  <td><button className="linkbtn strong" onClick={() => go("lesson-" + l.id)}>{l.title}</button>{!l.variantsOk && <span className="warnico" title="Needs variants"><Icon n="warn" s={14} /></span>}</td>
                  <td><span className="subj"><SubjectDot s={l.subject} />{SUBJECTS[l.subject].name}</span></td>
                  <td className="num">{l.ageMin}–{l.ageMax}</td>
                  <td><div className="tags">{l.tags.slice(0, 3).map((t) => <Tag key={t} t={tagById[t]} />)}</div></td>
                  <td><StatusBadge s={l.status} /></td>
                  <td>{usedIn(l.id).length || "–"}</td><td className="muted">{l.updated}</td>
                </tr>))}</tbody>
            </table></div>
          )}
        </div>
      </div>
      {peek && <QuickLook l={peek} close={() => setPeek(null)} ctx={ctx} />}
    </>
  );
}

function QuickLook({ l, close, ctx }) {
  const [theme, setTheme] = useState("space");
  useEffect(() => { const k = (e) => e.key === "Escape" && close(); addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, []);
  return (
    <div className="drawer-wrap" onClick={close}>
      <aside className="drawer" role="dialog" aria-modal="true" aria-label={`Quick look: ${l.title}`} onClick={(e) => e.stopPropagation()}>
        <div className="row sp"><h2>{l.title}</h2><button className="btn btn-ghost" onClick={close} aria-label="Close"><Icon n="x" /></button></div>
        <div className="meta"><span className="subj"><SubjectDot s={l.subject} />{SUBJECTS[l.subject].name}</span><span>{ages(l.ageMin, l.ageMax)}</span><StatusBadge s={l.status} /></div>
        <div className="row gap"><label htmlFor="qlt" className="muted">Theme</label><select id="qlt" value={theme} onChange={(e) => setTheme(e.target.value)}>{Object.entries(THEMES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
        <SlidePreview title="Ten ones make one ten" body="Count the ones. When you reach ten, bundle them into a ten stick." theme={theme} device="ipad" />
        <h3>Outline</h3>
        <ol className="outline">{PARTS.map((p) => <li key={p.id}><b>{p.kind}:</b> {p.title} <span className="muted">· {p.slides.length} slides</span></li>)}</ol>
        <h3>Big quiz</h3>
        <p className="muted">{l.qs} questions · pass at 70% · {l.variantsOk ? "every question has 2+ variants" : "some questions need variants"}</p>
        <div className="tags">{l.tags.map((t) => <Tag key={t} t={tagById[t]} />)}</div>
        <div className="row gap"><Btn kind="primary" icon="edit" onClick={() => ctx.go("lesson-" + l.id)}>Open editor</Btn><Btn icon="eye" onClick={() => ctx.say("Opens the full-screen preview in a new tab.")}>Full preview</Btn></div>
      </aside>
    </div>
  );
}

// ---------- lesson editor ----------
function LessonEditor({ ctx, id }) {
  const { lessons, setLessons, courses, classes, P, say, go } = ctx;
  const l = lessons.find((x) => x.id === id) ?? lessons[0];
  const inCourses = courses.filter((c) => c.items.includes(l.id));
  const inClasses = classes.filter((k) => k.courses.some((x) => inCourses.some((c) => c.id === x.id)));
  const canEdit = P.isSuper || (inClasses.length > 0 && inClasses.every((k) => P.access(k.id) === "edit"));
  const [tab, setTab] = useState("content");
  const [part, setPart] = useState(0);
  const [slide, setSlide] = useState(2);
  const [title, setTitle] = useState("Show 34 with blocks");
  const [body, setBody] = useState("3 tens and 4 ones make 34. Drag the blocks to build it.");
  const [num, setNum] = useState(34);
  const [device, setDevice] = useState("ipad");
  const [theme, setTheme] = useState("space");
  const [asStudent, setAsStudent] = useState("");
  const update = (patch) => setLessons(lessons.map((x) => (x.id === l.id ? { ...x, ...patch } : x)));
  const checks = [
    { ok: true, t: "British spelling", d: "No US spellings found." },
    { ok: true, t: "Reading age fits age " + l.ageMin + " to " + l.ageMax, d: "Longest sentence 12 words." },
    { ok: false, t: "Alt text", d: "Part 2, slide 1: picture has no description.", go: [1, 0] },
    { ok: l.variantsOk, t: "Quiz variants", d: l.variantsOk ? "Every question has 2 or more." : "Q2 has 1 variant, Q6 has none.", tab: "quiz" },
    { ok: true, t: "Mini quiz in every part", d: "4 of 4 parts." },
    { ok: true, t: "Narration script", d: "Every slide has one." },
  ];
  const failed = checks.filter((c) => !c.ok).length;
  return (
    <>
      <Header title={l.title} sub={<span className="meta"><span className="subj"><SubjectDot s={l.subject} />{SUBJECTS[l.subject].name}</span><span>{ages(l.ageMin, l.ageMax)}</span><StatusBadge s={l.status} /><span>In {inCourses.map((c) => c.title).join(", ") || "no courses"}</span></span>} back={["lessons", "Lessons"]}>
        {canEdit ? <>
          <Btn icon="eye" onClick={() => say("Full-screen preview opens in a new tab. No AI is used.")}>Preview</Btn>
          {l.status !== "published" ? <Btn kind="primary" onClick={() => { update({ status: "published" }); say("Published. Children in its courses can see it now."); }} disabled={failed > 0 && !P.isSuper} title={failed ? "Fix checks first" : ""}>Publish</Btn> : <Btn kind="primary" onClick={() => say("Saved as version 4.")}>Save</Btn>}
        </> : <><Badge>View only</Badge><Btn icon="copy" kind="primary" onClick={() => say("A copy you own was made. Edit it and add it to your class's course.")}>Duplicate to edit</Btn></>}
      </Header>
      {!canEdit && <div className="note"><Icon n="lock" s={16} /> {P.isSuper ? "" : `This lesson is used in ${inClasses.map((k) => k.name).join(" and ")}. You can edit lessons only when every class using them is yours to edit.`}</div>}
      <div className="tabs" role="tablist">
        {[["content", "Content"], ["quiz", "Quiz"], ["details", "Details and tags"], ["history", "History"]].map(([k, n]) => <button key={k} role="tab" aria-selected={tab === k} className={cx("tab", tab === k && "on")} onClick={() => setTab(k)}>{n}{k === "quiz" && !l.variantsOk && <span className="dot" aria-label="needs attention" />}</button>)}
        <span className="grow" />
        <button className={cx("checks-btn", failed ? "bad" : "good")} onClick={() => setTab("content")}>{failed ? `${failed} check${failed > 1 ? "s" : ""} to fix` : "All checks pass"}</button>
      </div>
      {tab === "content" && (
        <div className="editor">
          <nav className="ed-out" aria-label="Lesson outline">
            {PARTS.map((p, i) => (
              <div key={p.id} className="ed-part">
                <button className={cx("ed-ph", part === i && "on")} onClick={() => { setPart(i); setSlide(0); }} aria-expanded={part === i}><span className="kind">{p.kind}</span>{p.title}</button>
                {part === i && <ol>{p.slides.map((s, j) => <li key={j}><button className={cx("ed-s", slide === j && "on")} onClick={() => setSlide(j)} aria-current={slide === j}><Icon n="drag" s={14} />{j + 1}. {s}</button></li>)}<li><button className="ed-s add" disabled={!canEdit} onClick={() => say("New slide added after this one.")}>+ Add slide</button></li></ol>}
              </div>
            ))}
          </nav>
          <section className="ed-mid" aria-label="Slide editor">
            <div className="row sp"><h2>Slide {slide + 1}: {PARTS[part].slides[slide]}</h2><Btn kind="ghost" icon="sparkle" disabled={!canEdit} onClick={() => say("Ask Claude: describe the change, e.g. 'make this easier'. A draft appears for you to accept.")}>Ask Claude</Btn></div>
            <fieldset disabled={!canEdit} className="blocks">
              <div className="blk"><span className="blk-l">Heading</span><input className="inp" value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Heading" /></div>
              <div className="blk"><span className="blk-l">Text</span><textarea className="inp" rows={3} value={body} onChange={(e) => setBody(e.target.value)} aria-label="Text" /><small className="muted">{body.split(/\s+/).length} words · reading age 6</small></div>
              <div className="blk"><span className="blk-l">Place value blocks</span><label className="row gap">Number <input className="inp num" type="number" min={1} max={99} value={num} onChange={(e) => setNum(Math.max(1, Math.min(99, +e.target.value || 1)))} aria-label="Number shown" /></label><label className="chk"><input type="checkbox" defaultChecked /> Children can drag the blocks</label></div>
              <div className="blk"><span className="blk-l">Narration</span><textarea className="inp" rows={2} defaultValue="Look! Three tens and four ones. Let's count them together." aria-label="Narration script" /></div>
            </fieldset>
            <div className="palette" aria-label="Add a block">{["Text", "Picture", "Clip", "Number line", "Ten frame", "Fraction bars", "Mini quiz"].map((b) => <button key={b} className="pal" disabled={!canEdit} onClick={() => say(`${b} block added to this slide.`)}>+ {b}</button>)}</div>
            <div className="checks">
              <h3>Checks</h3>
              <ul>{checks.map((c) => <li key={c.t} className={c.ok ? "ok" : "bad"}><Icon n={c.ok ? "check" : "warn"} s={16} /><span><b>{c.t}.</b> {c.d}</span>{!c.ok && <button className="linkbtn" onClick={() => (c.tab ? setTab(c.tab) : (setPart(c.go[0]), setSlide(c.go[1])))}>Go to it</button>}</li>)}</ul>
            </div>
          </section>
          <section className="ed-prev" aria-label="Live preview">
            <div className="prev-tools">
              <select aria-label="Device" value={device} onChange={(e) => setDevice(e.target.value)}><option value="ipad">iPad landscape</option><option value="portrait">iPad portrait</option><option value="surface">Surface</option><option value="phone">Phone</option></select>
              <select aria-label="Theme" value={theme} onChange={(e) => setTheme(e.target.value)}>{Object.entries(THEMES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
              <select aria-label="Preview as" value={asStudent} onChange={(e) => setAsStudent(e.target.value)}><option value="">As a new child</option>{ctx.students.map((s) => <option key={s.id} value={s.id}>As {s.name}</option>)}</select>
            </div>
            <SlidePreview title={title} body={body} theme={theme} device={device} blocks={num} />
            <p className="muted small">{asStudent ? `Showing what ${ctx.students.find((s) => s.id === asStudent).name} sees: part 1 done, part 2 open. Read only; nothing is recorded.` : "Updates as you type. Preview never records attempts or uses AI."}</p>
          </section>
        </div>
      )}
      {tab === "quiz" && <QuizBuilder canEdit={canEdit} say={say} onFixed={() => update({ variantsOk: true })} />}
      {tab === "details" && <Details l={l} update={update} canEdit={canEdit} />}
      {tab === "history" && (
        <div className="panel"><h2>Versions</h2>
          <ul className="hist">{[["Version 3", "Uzair", "2 days ago", "Part 2 easier; 4 new variants"], ["Version 2", "Uzair", "1 week ago", "Added clip to part 1"], ["Version 1", "Imported from Claude", "2 weeks ago", "First import"]].map(([v, who, when, what], i) => <li key={v}><b>{v}</b><span>{what}</span><span className="muted">{who} · {when}</span>{i > 0 && <span className="row gap"><Btn kind="ghost" onClick={() => say("Side-by-side changes open here.")}>Compare</Btn><Btn kind="ghost" disabled={!canEdit} onClick={() => say(`Restored ${v} as a new version.`)}>Restore</Btn></span>}</li>)}</ul>
        </div>
      )}
    </>
  );
}

function QuizBuilder({ canEdit, say, onFixed }) {
  const [qs, setQs] = useState(QUESTIONS0);
  const [cur, setCur] = useState("q3");
  const q = qs.find((x) => x.id === cur);
  const set = (patch) => setQs(qs.map((x) => (x.id === cur ? { ...x, ...patch } : x)));
  const makeVariants = () => {
    const nq = qs.map((x) => (x.variants.length >= 2 ? x : { ...x, variants: [...x.variants, ...["Draft: " + x.prompt.replace(/\d+/, (m) => String(+m + 11)), "Draft: " + x.prompt.replace(/\d+/, (m) => String(+m + 23))].slice(0, 2 - x.variants.length)] }));
    setQs(nq); onFixed(); say("Drafted variants for 2 questions with Workers AI. Check them before publishing.");
  };
  const short = qs.filter((x) => x.variants.length < 2).length;
  return (
    <div className="quiz">
      <aside className="q-list" aria-label="Questions">
        <div className="row sp"><b>Big quiz · {qs.length} questions</b><Btn kind="ghost" icon="plus" disabled={!canEdit} onClick={() => say("Pick a type: multiple choice, type the answer, drag blocks, compare, number line, ordering, matching, label a diagram…")}>Add</Btn></div>
        {short > 0 && <div className="warnline"><Icon n="warn" s={14} />{short} need 2+ variants for retakes <button className="linkbtn" disabled={!canEdit} onClick={makeVariants}>Draft them</button></div>}
        <ol>{qs.map((x, i) => (
          <li key={x.id}><button className={cx("q-i", cur === x.id && "on")} onClick={() => setCur(x.id)} aria-current={cur === x.id}>
            <span className="q-n">{i + 1}</span><span className="q-t"><b>{x.prompt}</b><small>{x.type} · {"●".repeat(x.diff)}{"○".repeat(3 - x.diff)} · {x.stats.correct}% right</small></span>
            {x.variants.length < 2 && <span className="reddot" aria-label="needs variants" />}{x.stats.flag && <Badge tone={x.stats.flag === "confusing" ? "red" : "amber"}>{x.stats.flag === "confusing" ? "Confusing" : "Too easy"}</Badge>}
          </button></li>))}</ol>
      </aside>
      <section className="q-ed" aria-label="Question editor">
        <fieldset disabled={!canEdit}>
          <div className="grid2">
            <label>Type<select className="inp" value={q.type} onChange={(e) => set({ type: e.target.value })}>{["Multiple choice", "Type the answer", "Drag blocks", "Compare", "Number line", "Ordering", "Matching", "Label a diagram"].map((t) => <option key={t}>{t}</option>)}</select></label>
            <label>Difficulty<select className="inp" value={q.diff} onChange={(e) => set({ diff: +e.target.value })}><option value={1}>1 · Easy</option><option value={2}>2 · Core</option><option value={3}>3 · Stretch</option></select></label>
          </div>
          <label>Question<input className="inp" value={q.prompt} onChange={(e) => set({ prompt: e.target.value })} /></label>
          <div className="grid2">
            <label>Right answer<input className="inp" value={q.answer} onChange={(e) => set({ answer: e.target.value })} /></label>
            <label>Hint<input className="inp" defaultValue="Look at the tens digit first." /></label>
          </div>
          <label>Why a wrong answer is wrong<input className="inp" defaultValue="27 has only 2 tens. 72 has 7 tens, so 72 is bigger." /></label>
          <div className="variants">
            <div className="row sp"><b>Variants for retakes ({q.variants.length})</b><Btn kind="ghost" icon="sparkle" onClick={() => { set({ variants: [...q.variants, "Draft: " + q.prompt.replace(/\d+/, (m) => String(+m + 5))] }); say("Drafted one variant. Edit or delete it."); }}>Draft a variant</Btn></div>
            {q.variants.length === 0 && <p className="warnline"><Icon n="warn" s={14} />No variants. A child retaking the quiz would see the same question.</p>}
            {q.variants.map((v, i) => <div key={i} className="var"><span className="q-n">{String.fromCharCode(66 + i)}</span><input className="inp" value={v} aria-label={`Variant ${i + 1}`} onChange={(e) => set({ variants: q.variants.map((x, j) => (j === i ? e.target.value : x)) })} /><button className="btn btn-ghost" aria-label="Delete variant" onClick={() => set({ variants: q.variants.filter((_, j) => j !== i) })}><Icon n="x" s={14} /></button></div>)}
          </div>
        </fieldset>
        <div className="stats-card">
          <b>How children did</b>
          <div className="stats"><div><b>{q.stats.correct}%</b><small>right first time</small></div><div><b>{q.stats.time}</b><small>average time</small></div></div>
          <p className="muted small">Most picked wrong answer: <b>{q.stats.wrong}</b></p>
          {q.stats.flag === "confusing" && <p className="warnline"><Icon n="warn" s={14} />A wrong option is picked more than the right one by Class 1. Check the wording.</p>}
          {q.stats.flag === "easy" && <p className="muted small">Over 95% right. Consider a stretch variant.</p>}
        </div>
      </section>
    </div>
  );
}

function Details({ l, update, canEdit }) {
  const [tq, setTq] = useState("");
  const add = (id) => update({ tags: [...l.tags, id] });
  return (
    <div className="panel details">
      <fieldset disabled={!canEdit}>
        <div className="grid2">
          <label>Title<input className="inp" value={l.title} onChange={(e) => update({ title: e.target.value })} /></label>
          <label>Subject<select className="inp" value={l.subject} onChange={(e) => update({ subject: e.target.value })}>{Object.entries(SUBJECTS).map(([k, s]) => <option key={k} value={k}>{s.name}</option>)}</select></label>
        </div>
        <div className="grid2">
          <label>Youngest age<select className="inp" value={l.ageMin} onChange={(e) => update({ ageMin: +e.target.value })}>{[5, 6, 7, 8, 9, 10, 11].map((a) => <option key={a}>{a}</option>)}</select></label>
          <label>Oldest age<select className="inp" value={l.ageMax} onChange={(e) => update({ ageMax: +e.target.value })}>{[5, 6, 7, 8, 9, 10, 11].map((a) => <option key={a}>{a}</option>)}</select></label>
        </div>
        <div><b>Tags</b>
          <div className="tags big">{l.tags.map((t) => <Tag key={t} t={tagById[t]} onRemove={canEdit ? () => update({ tags: l.tags.filter((x) => x !== t) }) : null} />)}</div>
          <input className="inp" placeholder="Add a tag or curriculum code" value={tq} onChange={(e) => setTq(e.target.value)} aria-label="Add a tag" />
          {tq && <div className="tagpick">{TAGS.filter((t) => !l.tags.includes(t.id) && t.label.toLowerCase().includes(tq.toLowerCase())).map((t) => <button key={t.id} className={cx("tag", `k-${t.kind}`)} onClick={() => { add(t.id); setTq(""); }}>+ {t.label}</button>)}<button className="tag k-custom" onClick={() => setTq("")}>+ Create "{tq}"</button></div>}
          <p className="muted small">Tag kinds: <Tag t={{ kind: "topic", label: "Topic" }} /> <Tag t={{ kind: "skill", label: "Skill" }} /> <Tag t={{ kind: "standard", label: "Curriculum code" }} /> <Tag t={{ kind: "custom", label: "Your own" }} /></p>
        </div>
        <label>I can… (success criteria)<textarea className="inp" rows={3} defaultValue={"I can say how many tens and ones are in a 2-digit number.\nI can build a number with blocks.\nI can compare two numbers using tens."} /></label>
      </fieldset>
    </div>
  );
}

// ---------- courses ----------
function Courses({ ctx }) {
  const { courses, setCourses, lessons, P, go, say } = ctx;
  const [q, setQ] = useState("");
  const list = courses.filter((c) => c.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <Header title="Courses" sub="A course is an ordered set of lessons. Put the same course in as many classes as you like.">
        <Btn kind="primary" icon="plus" onClick={() => { const id = "c" + (courses.length + 1) + "n"; setCourses([...courses, { id, title: "New course", subject: "maths", ageMin: 6, ageMax: 7, status: "draft", items: [] }]); go("course-" + id); }}>New course</Btn>
      </Header>
      <div className="toolbar"><div className="search grow"><Icon n="search" s={16} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses" aria-label="Search courses" /></div></div>
      <div className="cgrid">
        {list.map((c) => {
          const ls = c.items.filter((x) => typeof x === "string").map((id) => lessons.find((l) => l.id === id));
          const ks = P.courseClasses(c.id);
          return (
            <a key={c.id} className="ccard" href={"#course-" + c.id}>
              <div className="cc-top" style={{ "--sc": c.subject ? SUBJECTS[c.subject].color : "var(--accent)" }}><span>{c.subject ? SUBJECTS[c.subject].name : "Mixed subjects"}</span></div>
              <div className="cc-b">
                <div className="row sp"><b>{c.title}</b><StatusBadge s={c.status} /></div>
                <small>{ls.length} lessons · {ls.reduce((a, l) => a + l.mins, 0)} min · {ages(c.ageMin, c.ageMax)}</small>
                <small>{ks.length ? "In " + ks.map((k) => k.name).join(", ") : "Not in a class yet"}</small>
                {!P.canEditCourse(c.id) && <Badge>View only</Badge>}
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}

function CourseBuilder({ ctx, id }) {
  const { courses, setCourses, lessons, classes, P, say } = ctx;
  const c = courses.find((x) => x.id === id) ?? courses[0];
  const canEdit = P.canEditCourse(c.id);
  const [f, setF] = useState({ ...EMPTY_F, subjects: c.subject ? [c.subject] : [], ageMin: c.ageMin, ageMax: c.ageMax });
  const [drag, setDrag] = useState(null);
  const [over, setOver] = useState(null);
  const set = (items) => setCourses(courses.map((x) => (x.id === c.id ? { ...x, items } : x)));
  const items = c.items;
  const lessonIds = items.filter((x) => typeof x === "string");
  const pool = filterLessons(lessons, f, courses, classes).filter((l) => !lessonIds.includes(l.id));
  const insertAt = (lid, idx) => { const next = items.filter((x) => x !== lid); next.splice(idx ?? next.length, 0, lid); set(next); };
  const move = (i, d) => { const j = i + d; if (j < 0 || j >= items.length) return; const next = [...items]; [next[i], next[j]] = [next[j], next[i]]; set(next); };
  const onDrop = (idx) => { if (!drag) return; if (drag.from === "lib") { insertAt(drag.id, idx); say(`Added ${lessons.find((l) => l.id === drag.id).title}.`); } else { const it = items[drag.i]; const next = items.filter((_, k) => k !== drag.i); next.splice(idx > drag.i ? idx - 1 : idx, 0, it); set(next); } setDrag(null); setOver(null); };
  const ls = lessonIds.map((x) => lessons.find((l) => l.id === x));
  const misfit = ls.filter((l) => l.ageMax < c.ageMin || l.ageMin > c.ageMax);
  const notPub = ls.filter((l) => l.status !== "published");
  const std = TAGS.filter((t) => t.kind === "standard");
  const covered = std.filter((t) => ls.some((l) => l.tags.includes(t.id)));
  const ks = P.courseClasses(c.id);
  let n = 0;
  return (
    <>
      <Header title={c.title} sub={`${c.subject ? SUBJECTS[c.subject].name : "Mixed"} · ${ages(c.ageMin, c.ageMax)} · ${ks.length ? "in " + ks.map((k) => k.name).join(", ") : "not in a class"}`} back={["courses", "Courses"]}>
        {canEdit ? <><Btn onClick={() => set([...items, { sec: "New section" }])} icon="plus">Section</Btn><Btn kind="primary" onClick={() => say("Course saved. Classes using it update straight away.")}>Save</Btn></> : <Badge>View only</Badge>}
      </Header>
      <div className="cchecks" aria-label="Course checks">
        <span><b>{ls.length}</b> lessons</span><span><b>{ls.reduce((a, l) => a + l.mins, 0)}</b> minutes</span>
        <span className={misfit.length ? "bad" : "ok"}><Icon n={misfit.length ? "warn" : "check"} s={14} />{misfit.length ? `${misfit.length} outside age ${c.ageMin} to ${c.ageMax}` : "Ages fit"}</span>
        <span className={notPub.length ? "bad" : "ok"}><Icon n={notPub.length ? "warn" : "check"} s={14} />{notPub.length ? `${notPub.length} not published (children won't see)` : "All published"}</span>
        <span><Icon n="tag" s={14} />{covered.length} of {std.length} curriculum codes</span>
        {ks.length > 0 && <span className="muted">Used by {ks.length} {ks.length > 1 ? "classes" : "class"}: changes reach children straight away</span>}
      </div>
      <div className="builder">
        <section className="b-lib" aria-label="Lesson library">
          <div className="row sp"><h2>Library</h2><span className="muted small">{pool.length} lessons</span></div>
          <div className="search"><Icon n="search" s={16} /><input value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} placeholder="Search" aria-label="Search library" /></div>
          <div className="chips">
            {Object.entries(SUBJECTS).map(([k, s]) => <button key={k} className={cx("chip", "tog", f.subjects.includes(k) && "on")} aria-pressed={f.subjects.includes(k)} onClick={() => setF({ ...f, subjects: f.subjects.includes(k) ? f.subjects.filter((x) => x !== k) : [...f.subjects, k] })}><SubjectDot s={k} />{s.name}</button>)}
            <button className={cx("chip", "tog", f.ageMin === c.ageMin && f.ageMax === c.ageMax && "on")} onClick={() => setF(f.ageMin === c.ageMin && f.ageMax === c.ageMax ? { ...f, ageMin: 5, ageMax: 11 } : { ...f, ageMin: c.ageMin, ageMax: c.ageMax })}>Course ages only</button>
          </div>
          <ul className="b-pool">
            {pool.map((l) => (
              <li key={l.id} draggable={canEdit} onDragStart={() => setDrag({ from: "lib", id: l.id })} onDragEnd={() => { setDrag(null); setOver(null); }} className="b-item">
                {canEdit && <span className="grip" aria-hidden="true"><Icon n="drag" s={14} /></span>}
                <span className="b-t"><b>{l.title}</b><small><SubjectDot s={l.subject} />{ages(l.ageMin, l.ageMax)} · {l.mins} min{l.status !== "published" && " · " + STATUS[l.status][0]}</small></span>
                {canEdit && <button className="btn btn-ghost" onClick={() => { insertAt(l.id); say(`Added ${l.title}.`); }} aria-label={`Add ${l.title} to course`}>Add</button>}
              </li>
            ))}
            {pool.length === 0 && <li className="muted small">Nothing left that matches. Try "Course ages only" off.</li>}
          </ul>
        </section>
        <section className={cx("b-course", drag && "dragging")} aria-label="Course outline" onDragOver={(e) => { e.preventDefault(); }} onDrop={() => onDrop(over ?? items.length)}>
          <h2>Course outline</h2>
          {items.length === 0 && <div className="dropzone">Drag lessons here, or press Add.</div>}
          <ol className="b-list">
            {items.map((it, i) => {
              const isSec = typeof it !== "string";
              const l = !isSec && lessons.find((x) => x.id === it);
              if (!isSec) n++;
              const bad = l && (l.ageMax < c.ageMin || l.ageMin > c.ageMax);
              return (
                <li key={isSec ? "s" + i : it} className={cx(isSec ? "b-sec" : "b-row", over === i && "over", bad && "misfit")} draggable={canEdit} onDragStart={() => setDrag({ from: "course", i })} onDragOver={(e) => { e.preventDefault(); setOver(i); }}>
                  {canEdit && <span className="grip" aria-hidden="true"><Icon n="drag" s={14} /></span>}
                  {isSec ? <input className="inp sec" value={it.sec} disabled={!canEdit} aria-label="Section name" onChange={(e) => set(items.map((x, k) => (k === i ? { sec: e.target.value } : x)))} /> : <>
                    <span className="b-num">{n}</span>
                    <span className="b-t"><b>{l.title}</b><small>{ages(l.ageMin, l.ageMax)} · {l.parts} parts · {l.mins} min {l.status !== "published" && <StatusBadge s={l.status} />}{bad && <span className="warnline inline"><Icon n="warn" s={12} />age outside course</span>}</small></span>
                  </>}
                  {canEdit && <span className="b-act">
                    <button className="btn btn-ghost" aria-label="Move up" onClick={() => move(i, -1)} disabled={i === 0}><Icon n="up" s={14} /></button>
                    <button className="btn btn-ghost" aria-label="Move down" onClick={() => move(i, 1)} disabled={i === items.length - 1}><Icon n="down" s={14} /></button>
                    <button className="btn btn-ghost" aria-label="Remove" onClick={() => set(items.filter((_, k) => k !== i))}><Icon n="x" s={14} /></button>
                  </span>}
                </li>
              );
            })}
          </ol>
          {drag && <div className={cx("dropzone", over === null && "on")} onDragOver={(e) => { e.preventDefault(); setOver(null); }}>Drop here to add at the end</div>}
        </section>
      </div>
    </>
  );
}

// ---------- classes ----------
function ClassList({ ctx }) {
  const { P, students, say, classes, setClasses } = ctx;
  return (
    <>
      <Header title="Classes" sub="Each student is in one class. A class takes courses; teachers are assigned per class.">
        {P.isSuper && <Btn kind="primary" icon="plus" onClick={() => { setClasses([...classes, { id: "kn" + classes.length, name: "New class", age: "6 to 7", courses: [], staff: [] }]); say("Class created."); }}>New class</Btn>}
      </Header>
      <div className="tablewrap"><table className="tbl">
        <thead><tr><th>Class</th><th>Students</th><th>Courses</th><th>Teachers</th><th>Your access</th></tr></thead>
        <tbody>{P.myClasses.map((c) => (
          <tr key={c.id}><td><a className="strong" href={"#class-" + c.id}>{c.name}</a><div className="muted small">Age {c.age}</div></td>
            <td>{students.filter((s) => s.classId === c.id).map((s) => s.name).join(", ") || "–"}</td>
            <td>{c.courses.length}</td><td>{c.staff.map((s) => STAFF.find((x) => x.id === s.id).name).join(", ") || "–"}</td>
            <td>{P.access(c.id) === "edit" ? <Badge tone="green">Can edit</Badge> : <Badge>View only</Badge>}</td></tr>))}</tbody>
      </table></div>
    </>
  );
}

function ClassDetail({ ctx, id }) {
  const { classes, P } = ctx;
  const k = classes.find((x) => x.id === id) ?? classes[0];
  const [tab, setTab] = useState(id === "k4" ? "exams" : "courses");
  const can = P.access(k.id) === "edit";
  if (!P.access(k.id)) return <div className="empty">You are not assigned to this class.</div>;
  return (
    <>
      <Header title={k.name} sub={`Age ${k.age}`} back={["classes", "Classes"]}>{!can && <Badge>View only</Badge>}</Header>
      <div className="tabs" role="tablist">{[["courses", "Courses"], ["students", "Students"], ["exams", "Grand exams"], ["teachers", "Teachers"]].map(([t, n]) => <button key={t} role="tab" aria-selected={tab === t} className={cx("tab", tab === t && "on")} onClick={() => setTab(t)}>{n}</button>)}</div>
      {tab === "courses" && <ClassCourses ctx={ctx} k={k} can={can} />}
      {tab === "students" && <ClassStudents ctx={ctx} k={k} can={can} />}
      {tab === "exams" && <ExamGen ctx={ctx} k={k} can={can} />}
      {tab === "teachers" && <ClassTeachers ctx={ctx} k={k} />}
    </>
  );
}

function ClassCourses({ ctx, k, can }) {
  const { classes, setClasses, courses, lessons, say } = ctx;
  const setK = (patch) => setClasses(classes.map((x) => (x.id === k.id ? { ...x, ...patch } : x)));
  const avail = courses.filter((c) => !k.courses.some((x) => x.id === c.id));
  return (
    <div className="panel">
      <div className="row sp"><h2>Courses in {k.name}</h2>
        {can && <select aria-label="Add a course" value="" onChange={(e) => { if (e.target.value) { setK({ courses: [...k.courses, { id: e.target.value, rule: "mastery" }] }); say("Course added. Children see it next time they open the app."); } }}><option value="">+ Add a course…</option>{avail.map((c) => <option key={c.id} value={c.id}>{c.title} ({ages(c.ageMin, c.ageMax)})</option>)}</select>}
      </div>
      <ul className="kc">
        {k.courses.map((x, i) => {
          const c = courses.find((y) => y.id === x.id);
          const n = c.items.filter((y) => typeof y === "string").length;
          return (
            <li key={x.id}>
              <span className="sbar" style={{ background: c.subject ? SUBJECTS[c.subject].color : "var(--accent)" }} />
              <span className="kc-t"><a className="strong" href={"#course-" + c.id}>{c.title}</a><small>{n} lessons · {ages(c.ageMin, c.ageMax)}</small></span>
              <label className="kc-r"><span className="muted small">How lessons open</span>
                <select disabled={!can} value={x.rule} onChange={(e) => setK({ courses: k.courses.map((y, j) => (j === i ? { ...y, rule: e.target.value } : y)) })}>{Object.entries(RULES).map(([r, [nm]]) => <option key={r} value={r}>{nm}</option>)}</select>
                <small className="muted">{RULES[x.rule][1]}</small>
              </label>
              {can && <span className="row gap"><Btn kind="ghost" onClick={() => say("Pick a lesson to open early for the class or one student.")}>Open early…</Btn><button className="btn btn-ghost" aria-label={`Remove ${c.title}`} onClick={() => setK({ courses: k.courses.filter((_, j) => j !== i) })}><Icon n="x" s={14} /></button></span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ClassStudents({ ctx, k, can }) {
  const { students, setStudents, classes, P, say } = ctx;
  const ss = students.filter((s) => s.classId === k.id);
  return (
    <div className="panel">
      <div className="row sp"><h2>Students</h2>{P.isSuper && <Btn icon="plus" onClick={() => say("Add a student: first name, login and a temporary password.")}>Add student</Btn>}</div>
      <div className="tablewrap"><table className="tbl">
        <thead><tr><th>Name</th><th>Login</th><th>Progress</th><th>Last active</th><th>Class</th></tr></thead>
        <tbody>{ss.map((s) => (
          <tr key={s.id}><td className="strong">{s.name}{s.stuck && <div className="warnline"><Icon n="warn" s={12} />Stuck: {s.stuck}</div>}</td><td className="muted">{s.login}</td>
            <td><div className="bar sm" role="progressbar" aria-valuenow={s.done} aria-valuemax={s.total} aria-label={`${s.name} progress`}><span style={{ width: (s.done / s.total) * 100 + "%" }} /></div><small>{s.done} of {s.total} lessons</small></td>
            <td>{s.last}</td>
            <td>{P.isSuper ? <select aria-label={`Move ${s.name} to class`} value={s.classId} onChange={(e) => { setStudents(students.map((x) => (x.id === s.id ? { ...x, classId: e.target.value } : x))); say(`${s.name} moved. History and stars are kept.`); }}>{classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select> : k.name}</td></tr>))}
          {ss.length === 0 && <tr><td colSpan={5} className="muted">No students in this class yet.</td></tr>}</tbody>
      </table></div>
      <p className="muted small">A student is in exactly one class. Moving them keeps every attempt, star and sticker.</p>
    </div>
  );
}

function ClassTeachers({ ctx, k }) {
  const { classes, setClasses, P, say } = ctx;
  const setK = (staff) => setClasses(classes.map((x) => (x.id === k.id ? { ...x, staff } : x)));
  const others = STAFF.filter((s) => s.role === "teacher" && !k.staff.some((x) => x.id === s.id));
  return (
    <div className="panel">
      <div className="row sp"><h2>Teachers</h2>{P.isSuper && others.length > 0 && <select aria-label="Assign a teacher" value="" onChange={(e) => { if (e.target.value) { setK([...k.staff, { id: e.target.value, access: "view" }]); say("Teacher assigned with view access."); } }}><option value="">+ Assign a teacher…</option>{others.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>}</div>
      <ul className="kc">{k.staff.map((x, i) => {
        const s = STAFF.find((y) => y.id === x.id);
        return <li key={x.id}><span className="avatar" aria-hidden="true">{s.name.split(" ").pop()[0]}</span><span className="kc-t"><b>{s.name}</b><small>{s.email}</small></span>
          <label className="kc-r"><span className="muted small">Access</span><select disabled={!P.isSuper} value={x.access} onChange={(e) => setK(k.staff.map((y, j) => (j === i ? { ...y, access: e.target.value } : y)))}><option value="view">View: see lessons, courses, progress</option><option value="edit">Edit: also change lessons, courses, exams</option></select></label>
          {P.isSuper && <button className="btn btn-ghost" aria-label={`Remove ${s.name}`} onClick={() => setK(k.staff.filter((_, j) => j !== i))}><Icon n="x" s={14} /></button>}</li>;
      })}{k.staff.length === 0 && <li className="muted">Only super admins can see this class.</li>}</ul>
    </div>
  );
}

// ---------- grand exam generator ----------
const DIFF = ["Easy", "Core", "Stretch"];
function ExamGen({ ctx, k, can }) {
  const { courses, lessons, say } = ctx;
  const kc = k.courses.map((x) => courses.find((c) => c.id === x.id));
  const allL = [...new Set(kc.flatMap((c) => c.items.filter((x) => typeof x === "string")))];
  const [step, setStep] = useState(1);
  const [picked, setPicked] = useState(allL);
  const [count, setCount] = useState(20);
  const [mix, setMix] = useState([30, 50, 20]);
  const [weight, setWeight] = useState("even");
  const [types, setTypes] = useState(["Multiple choice", "Type the answer", "Compare", "Drag blocks", "Number line"]);
  const [time, setTime] = useState(30);
  const [paper, setPaper] = useState([]);
  const [seed, setSeed] = useState(1);
  const pl = picked.map((id) => lessons.find((l) => l.id === id));
  const gen = (keepLocked) => {
    const locked = keepLocked ? paper.filter((p) => p.locked) : [];
    const out = [...locked]; let s = seed * 7 + 3;
    const typesArr = types.length ? types : ["Multiple choice"];
    let i = 0;
    while (out.length < count && pl.length) {
      const l = pl[i % pl.length]; s = (s * 9301 + 49297) % 233280;
      const d = s / 233280 < mix[0] / 100 ? 0 : s / 233280 < (mix[0] + mix[1]) / 100 ? 1 : 2;
      const t = typesArr[s % typesArr.length];
      out.push({ id: `${l.id}-${i}-${seed}`, lesson: l, diff: d, type: t, prompt: sampleQ(l, d, s), locked: false });
      i++;
    }
    setPaper(out.slice(0, count)); setSeed(seed + 1);
  };
  const swap = (idx) => { const p = paper[idx]; const s = (seed * 31 + idx * 17) % 997; setPaper(paper.map((x, j) => (j === idx ? { ...x, id: x.id + "s", prompt: sampleQ(p.lesson, p.diff, s), type: types[s % types.length] ?? x.type } : x))); setSeed(seed + 1); };
  useEffect(() => { if (step === 3 && paper.length === 0) gen(false); }, [step]);
  let no = 0;
  const byCourse = kc.map((c) => ({ c, qs: paper.map((p, idx) => ({ ...p, idx })).filter((p) => c.items.includes(p.lesson.id)) })).filter((g) => g.qs.length).map((g) => ({ ...g, qs: g.qs.map((p) => ({ ...p, no: ++no })) }));
  return (
    <div className="exam">
      <div className="past panel"><div className="row sp"><h2>Grand exams</h2><span className="muted small">Past: "Semester 1 Maths" (kept from the old system, 2 attempts)</span></div></div>
      <ol className="steps" aria-label="Steps">{["Cover", "Blueprint", "Generate", "Publish"].map((s, i) => <li key={s} className={cx(step === i + 1 && "on", step > i + 1 && "done")}><button onClick={() => setStep(i + 1)} disabled={i + 1 > 2 && step < 3 && i + 1 !== 3} aria-current={step === i + 1 ? "step" : undefined}><span>{step > i + 1 ? "✓" : i + 1}</span>{s}</button></li>)}</ol>
      {step === 1 && (
        <div className="panel">
          <h2>What should the exam cover?</h2>
          {kc.map((c) => {
            const ids = c.items.filter((x) => typeof x === "string");
            const all = ids.every((id) => picked.includes(id));
            return (
              <fieldset key={c.id} className="cover"><legend><label className="chk"><input type="checkbox" checked={all} onChange={() => setPicked(all ? picked.filter((x) => !ids.includes(x)) : [...new Set([...picked, ...ids])])} /><b>{c.title}</b></label></legend>
                <div className="cover-l">{ids.map((id) => { const l = lessons.find((x) => x.id === id); return <label key={id} className="chk"><input type="checkbox" checked={picked.includes(id)} onChange={() => setPicked(picked.includes(id) ? picked.filter((x) => x !== id) : [...picked, id])} />{l.title}{l.status !== "published" && <Badge tone="amber">Not published</Badge>}</label>; })}</div>
              </fieldset>
            );
          })}
          <div className="row sp"><span className="muted">{picked.length} lessons · {pl.reduce((a, l) => a + l.qs, 0)} questions to pick from</span><Btn kind="primary" disabled={!picked.length} onClick={() => setStep(2)}>Next: blueprint</Btn></div>
        </div>
      )}
      {step === 2 && (
        <div className="panel bp">
          <h2>Blueprint</h2>
          <label className="rng"><span>Questions <b>{count}</b></span><input type="range" min={10} max={40} value={count} onChange={(e) => setCount(+e.target.value)} /></label>
          <div><b>Difficulty mix</b>
            <div className="mixbar" aria-hidden="true">{mix.map((m, i) => <span key={i} className={"d" + i} style={{ width: m + "%" }}>{m >= 12 && `${DIFF[i]} ${m}%`}</span>)}</div>
            <div className="grid3">{DIFF.map((d, i) => <label key={d}>{d} %<input className="inp" type="number" min={0} max={100} step={5} value={mix[i]} onChange={(e) => { const v = Math.max(0, Math.min(100, +e.target.value)); const m = [...mix]; m[i] = v; const rest = 100 - v; const o = [0, 1, 2].filter((x) => x !== i); const sum = mix[o[0]] + mix[o[1]] || 1; m[o[0]] = Math.round((mix[o[0]] / sum) * rest); m[o[1]] = rest - m[o[0]]; setMix(m); }} /></label>)}</div>
          </div>
          <fieldset><legend>Spread questions</legend><label className="chk"><input type="radio" name="w" checked={weight === "even"} onChange={() => setWeight("even")} />Evenly across lessons</label><label className="chk"><input type="radio" name="w" checked={weight === "len"} onChange={() => setWeight("len")} />By lesson length</label><label className="chk"><input type="radio" name="w" checked={weight === "weak"} onChange={() => setWeight("weak")} />More from lessons the class found hard</label></fieldset>
          <fieldset><legend>Question types</legend><div className="tagpick">{["Multiple choice", "Type the answer", "Compare", "Drag blocks", "Number line", "Ordering", "Matching"].map((t) => <button key={t} className={cx("tag", "k-skill", types.includes(t) && "sel")} aria-pressed={types.includes(t)} onClick={() => setTypes(types.includes(t) ? types.filter((x) => x !== t) : [...types, t])}>{t}</button>)}</div></fieldset>
          <div className="grid2"><label>Time limit (minutes, 0 = none)<input className="inp" type="number" min={0} value={time} onChange={(e) => setTime(+e.target.value)} /></label><label>Attempts<select className="inp" defaultValue="2"><option value="1">1</option><option value="2">2 (retake uses new variants)</option><option value="0">Unlimited (practice)</option></select></label></div>
          <div className="row sp"><Btn onClick={() => setStep(1)}>Back</Btn><Btn kind="primary" icon="sparkle" onClick={() => { setPaper([]); setStep(3); }} disabled={!can}>Generate paper</Btn></div>
          {!can && <p className="muted small">View only: you can preview but not generate.</p>}
        </div>
      )}
      {step === 3 && (
        <div className="paper-wrap">
          <div className="panel paper-side">
            <h2>Paper</h2>
            <div className="stats"><div><b>{paper.length}</b><small>questions</small></div><div><b>{new Set(paper.map((p) => p.lesson.id)).size}</b><small>lessons</small></div><div><b>{time || "–"}</b><small>minutes</small></div></div>
            <div className="mixbar" aria-label="Difficulty in this paper">{[0, 1, 2].map((d) => { const n = paper.filter((p) => p.diff === d).length; return <span key={d} className={"d" + d} style={{ width: (n / (paper.length || 1)) * 100 + "%" }}>{n / (paper.length || 1) >= 0.18 ? `${DIFF[d]} ${n}` : n || ""}</span>; })}</div>
            <p className="muted small">No two variants of the same question. Locked questions stay when you regenerate.</p>
            <Btn icon="refresh" onClick={() => gen(true)}>Regenerate unlocked</Btn>
            <Btn kind="primary" onClick={() => setStep(4)}>Next: publish</Btn>
          </div>
          <div className="paper">
            {byCourse.map((g) => (
              <section key={g.c.id}><h3>{g.c.title} <span className="muted small">· {g.qs.length} questions</span></h3>
                <ol>{g.qs.map((p) => (
                  <li key={p.id} className={cx("pq", p.locked && "locked")}>
                    <span className="q-n">{p.no}</span>
                    <span className="pq-t"><b>{p.prompt}</b><small>{p.lesson.title} · {p.type} · <span className={"dtag d" + p.diff}>{DIFF[p.diff]}</span></small></span>
                    <span className="b-act">
                      <button className="btn btn-ghost" aria-pressed={p.locked} aria-label={p.locked ? "Unlock question" : "Lock question"} onClick={() => setPaper(paper.map((x, j) => (j === p.idx ? { ...x, locked: !x.locked } : x)))}><Icon n="lock" s={14} />{p.locked ? "Locked" : "Lock"}</button>
                      <button className="btn btn-ghost" disabled={p.locked} onClick={() => swap(p.idx)}><Icon n="refresh" s={14} />Swap</button>
                    </span>
                  </li>))}</ol>
              </section>
            ))}
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="panel">
          <h2>Publish</h2>
          <fieldset><legend>When can children take it?</legend><label className="chk"><input type="radio" name="op" defaultChecked />When I press Publish</label><label className="chk"><input type="radio" name="op" />On a date: <input className="inp num" type="date" defaultValue="2026-12-01" aria-label="Open date" /></label></fieldset>
          <label className="chk"><input type="checkbox" defaultChecked />Retakes use different variants of each question</label>
          <label className="chk"><input type="checkbox" defaultChecked />Show results by course and tag after submitting</label>
          <div className="row sp"><Btn onClick={() => setStep(3)}>Back</Btn><Btn kind="primary" disabled={!can} onClick={() => say(`Grand exam published to ${k.name}. ${paper.length} questions.`)}>Publish to {k.name}</Btn></div>
        </div>
      )}
    </div>
  );
}
const QBANK = {
  maths: [["How many tens are in {a}?", "Round {a} to the nearest ten.", "What is {a} + {b}?"], ["Which is bigger: {a} or {b}?", "Put {a} on a number line from 0 to 100.", "What is {a} − {b}?"], ["{a} sweets are shared by 4 friends. How many each?", "Explain why {a} is more than {b}.", "Find the missing number: {a} + ? = {c}"]],
  science: [["Name an animal that lives in a pond.", "What do plants need to grow?"], ["Why do some animals hibernate?", "Sort these into living and never living."], ["Predict what happens to a plant kept in the dark.", "Explain how a food chain starts with the Sun."]],
  "data-ai": [["What is an algorithm?", "Put the steps in order."], ["Spot the bug in these steps.", "How many times does this loop repeat?"], ["Write a loop that draws a square.", "Predict where the robot ends up."]],
  gk: [["Which continent is Pakistan in?", "Find the equator on the map."], ["Name a city on the Silk Road.", "What did traders carry?"], ["Why did the House of Wisdom matter?", "Compare two maps of the same place."]],
  english: [["Which word is a noun?", "Add a capital letter."], ["Pick the verb in the sentence.", "Join two sentences with 'and'."], ["Rewrite the sentence in the past tense.", "Which sentence persuades best?"]],
};
function sampleQ(l, d, s) {
  const pool = QBANK[l.subject][d]; const t = pool[s % pool.length];
  const a = 12 + (s % 80), b = 10 + ((s * 7) % 60);
  return t.replace("{a}", a).replace("{b}", b).replace("{c}", a + b);
}

// ---------- people ----------
function People({ ctx }) {
  const { classes, say } = ctx;
  const rows = [["See lesson library", "All", "All (read)", "All (read)"], ["Edit a lesson", "Any", "Own, or used only in their classes", "No"], ["Build and edit courses", "Any", "Used only in their classes", "No"], ["Add courses to class, set how lessons open", "Yes", "Their classes", "No"], ["Open a lesson early", "Yes", "Their classes", "No"], ["Generate and publish grand exams", "Yes", "Their classes", "Preview only"], ["See students and progress", "All", "Their classes", "Their classes"], ["Add or move students, reset passwords", "Yes", "No", "No"], ["Teachers, settings, AI budget, delete", "Yes", "No", "No"]];
  return (
    <>
      <Header title="People and roles" sub="Staff sign in with their email through Cloudflare Access. Students keep their username and password."><Btn kind="primary" icon="plus" onClick={() => say("Invite a teacher by email. They get access once added to Cloudflare Access.")}>Invite teacher</Btn></Header>
      <div className="panel">
        <h2>Staff</h2>
        <div className="tablewrap"><table className="tbl">
          <thead><tr><th>Name</th><th>Role</th><th>Classes</th></tr></thead>
          <tbody>{STAFF.map((s) => <tr key={s.id}><td className="strong">{s.name}<div className="muted small">{s.email}</div></td><td>{s.role === "super" ? <Badge tone="accent">Super admin</Badge> : <Badge>Teacher</Badge>}</td>
            <td>{s.role === "super" ? "All classes" : classes.filter((k) => k.staff.some((x) => x.id === s.id)).map((k) => `${k.name} (${k.staff.find((x) => x.id === s.id).access === "edit" ? "edit" : "view"})`).join(", ") || "None yet"}</td></tr>)}</tbody>
        </table></div>
      </div>
      <div className="panel">
        <h2>What each role can do</h2>
        <div className="tablewrap"><table className="tbl matrix">
          <thead><tr><th>Action</th><th>Super admin</th><th>Teacher with edit</th><th>Teacher with view</th></tr></thead>
          <tbody>{rows.map((r) => <tr key={r[0]}><td>{r[0]}</td>{r.slice(1).map((v, i) => <td key={i} className={v === "No" ? "no" : ""}>{v}</td>)}</tr>)}</tbody>
        </table></div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
