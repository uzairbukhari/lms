// Small helpers shared by the Science topic files (files starting with _ are not built as topics).
import { EXP } from "../lesson-kit.mjs";

/** An explainer on a named backdrop. */
export const EB = (backdrop, title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop });

/** One main quiz question: sub-lesson, depth, skill tag, the question, then its retake variants (at least 2). */
export const Q = (sub, depth, tag, q, ...alts) => ({ q: { ...q, skill_tag: tag }, sub, depth, alts: alts.map((a) => ({ ...a, skill_tag: tag })) });

/** The single-quote-safe way to list standards. */
export const NC = (code, text) => ({ framework: "nc_england", code, ...(text ? { text } : {}) });
export const PK = (code) => ({ framework: "pk_ncc", code });
export const CAM = (...codes) => codes.map((code) => ({ framework: "cambridge", code }));
