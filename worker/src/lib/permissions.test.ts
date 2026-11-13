import { describe, expect, it } from "vitest";
import { can, type Actor } from "./permissions";

const sup: Actor = { id: "s", level: "super", classes: {} };
const t: Actor = { id: "t", level: "teacher", classes: { a: "edit", b: "view" } };

describe("can", () => {
  it("lets a super admin do everything", () => {
    for (const a of ["delete", "teachers.manage", "class.exam", "lesson.edit"] as const) expect(can(sup, a, { classId: "z" })).toBe(true);
  });
  it("lets teachers read the library but not run people or settings", () => {
    expect(can(t, "lesson.read")).toBe(true);
    for (const a of ["students.manage", "teachers.manage", "settings.manage", "delete"] as const) expect(can(t, a)).toBe(false);
  });
  it("limits class actions to assigned classes and edit access", () => {
    expect(can(t, "class.read", { classId: "b" })).toBe(true);
    expect(can(t, "class.read", { classId: "c" })).toBe(false);
    expect(can(t, "class.exam", { classId: "a" })).toBe(true);
    expect(can(t, "class.exam", { classId: "b" })).toBe(false);
    expect(can(t, "class.unlock", { classId: "c" })).toBe(false);
  });
  it("lets a teacher edit own content, or content used only in classes they edit", () => {
    expect(can(t, "lesson.edit", { ownerId: "t", usedInClasses: ["c"] })).toBe(true);
    expect(can(t, "course.edit", { ownerId: "x", usedInClasses: ["a"] })).toBe(true);
    expect(can(t, "course.edit", { ownerId: "x", usedInClasses: ["a", "c"] })).toBe(false);
    expect(can(t, "course.edit", { ownerId: "x", usedInClasses: ["b"] })).toBe(false);
    expect(can(t, "lesson.edit", { ownerId: "x", usedInClasses: [] })).toBe(false);
  });
});
