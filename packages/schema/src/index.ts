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
export { blockNarration, buildSlides, plain, splitSentences, type Actor, type ExplainerItem, type ExplainerScene, type Slide, type SlideKind } from "./slides";
export * from "./glossary";
export * from "./visuals";
export * from "./games";
export * from "./rewards";
