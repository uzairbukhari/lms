/**
 * One place that decides who may do what. Every admin write calls `can()` in the Worker, never only in the UI.
 * Super admins do everything. Teachers act only on classes they are assigned to: "edit" access can change things, "view" only look.
 */
export type Access = "view" | "edit";
export type Actor = { id: string; level: "super" | "teacher"; classes: Record<string, Access> };

export type Action =
  | "lesson.read" | "course.read" | "class.read"
  | "lesson.edit" | "course.edit"
  | "class.courses" | "class.unlock" | "class.exam"
  | "class.progress"
  | "students.manage" | "teachers.manage" | "settings.manage" | "delete";

/** What the target is: a class, or lesson/course usage described by the classes that use it. */
export type Target = { classId?: string; ownerId?: string | null; usedInClasses?: string[] };

const CLASS_EDIT: Action[] = ["class.courses", "class.unlock", "class.exam"];
const SUPER_ONLY: Action[] = ["students.manage", "teachers.manage", "settings.manage", "delete"];

export function can(actor: Actor, action: Action, target: Target = {}): boolean {
  if (actor.level === "super") return true;
  if (action === "lesson.read" || action === "course.read") return true;
  if (SUPER_ONLY.includes(action)) return false;

  if (action === "class.read" || action === "class.progress") return !!target.classId && target.classId in actor.classes;
  if (CLASS_EDIT.includes(action)) return !!target.classId && actor.classes[target.classId] === "edit";

  if (action === "lesson.edit" || action === "course.edit") {
    if (target.ownerId && target.ownerId === actor.id) return true;
    const used = target.usedInClasses ?? [];
    // Shared content is never edited in place: used nowhere, or only in classes the teacher can edit.
    return used.length > 0 && used.every((c) => actor.classes[c] === "edit");
  }
  return false;
}
