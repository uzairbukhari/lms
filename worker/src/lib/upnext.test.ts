import { describe, expect, it } from "vitest";
import { chooseUpNext } from "./upnext";
import type { SubjectPath } from "./path";

const topic = (id: string, status: string, partsDone = 0) => ({ lessonId: id, title: id, position: 0, status: status as "current", bestPercent: null, attempts: 0, partsTotal: 4, partsDone });
const path = (subject: string, topics: ReturnType<typeof topic>[]): SubjectPath => ({ courseId: "c-" + subject, subject, grand: null, topics });
const none = { lastByLesson: {}, recentBySubject: {} };

describe("chooseUpNext", () => {
  it("carries on the most recently touched unfinished topic in any subject", () => {
    const paths = [path("maths", [topic("m1", "current", 1)]), path("science", [topic("s1", "current", 2)])];
    const r = chooseUpNext(paths, { lastByLesson: { m1: "2026-11-01 10:00:00", s1: "2026-11-02 09:00:00" }, recentBySubject: {} });
    expect(r).toMatchObject({ kind: "carry", subject: "science", lessonId: "s1" });
  });

  it("otherwise picks the subject used least in the last 7 days", () => {
    const paths = [path("maths", [topic("m1", "current")]), path("science", [topic("s1", "current")]), path("english", [topic("e1", "current")])];
    const r = chooseUpNext(paths, { lastByLesson: {}, recentBySubject: { maths: 5, science: 1, english: 3 } });
    expect(r).toMatchObject({ kind: "balance", subject: "science", lessonId: "s1" });
  });

  it("breaks ties by fewer topics passed, then list order", () => {
    const paths = [path("maths", [topic("m1", "done"), topic("m2", "current")]), path("science", [topic("s1", "current")])];
    expect(chooseUpNext(paths, none)).toMatchObject({ subject: "science" });
    const flat = [path("maths", [topic("m1", "current")]), path("science", [topic("s1", "current")])];
    expect(chooseUpNext(flat, none)).toMatchObject({ subject: "maths" });
  });

  it("skips subjects with nothing open and returns null when everything is done or locked", () => {
    expect(chooseUpNext([path("maths", [topic("m1", "done")]), path("science", [topic("s1", "locked")])], none)).toBeNull();
    expect(chooseUpNext([path("maths", [topic("m1", "done")]), path("science", [topic("s1", "current")])], none)).toMatchObject({ subject: "science" });
  });

  it("treats a topic opened early like an open one", () => {
    expect(chooseUpNext([path("maths", [topic("m1", "early", 1)])], none)).toMatchObject({ kind: "carry", lessonId: "m1" });
  });
});
