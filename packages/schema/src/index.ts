// Shared types and validation used by both the web app and the Worker.
// The lesson JSON schema (docs/PLAN.md section 5) is added in Phase 3.

export * from "./constants";
export * from "./auth";

export interface HealthResponse {
  ok: true;
  service: "lms";
  time: string;
}
export * from "./lesson";
export * from "./grading";
