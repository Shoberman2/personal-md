import type { Section } from "./types.js";
import { isSection } from "./types.js";

const DESIGN = /color|palette|font|typeface|typograph|layout|spacing|minimal|gradient|purple|css|visual|density/;
const DEPLOY = /deploy|vercel|supabase|netlify|docker|fly\.io|hosting/;
const COPY = /readme|tone|copy|emoji|voice|wording|headline/;
const NAMING = /name|naming|kebab|camel|pascal/;
const STRUCTURE = /folder|directory|monorepo|src\/|structure|layout of the repo/;
const CODE = /lint|format|semicolon|quote|commit|strict|typescript|prettier|eslint/;

export function guessSection(text: string, polarity: "like" | "dislike" | "note"): Section {
  const lower = text.toLowerCase();
  if (DESIGN.test(lower)) return "design";
  if (DEPLOY.test(lower)) return "deploy";
  if (COPY.test(lower)) return "copy";
  if (NAMING.test(lower)) return "naming";
  if (STRUCTURE.test(lower)) return "structure";
  if (CODE.test(lower)) return "code";
  if (polarity === "dislike") return "dislikes";
  return "stack";
}

export function sectionOrGuess(id: string | undefined, text: string, polarity: "like" | "dislike" | "note"): Section {
  if (id) {
    const head = id.split(".")[0] ?? "";
    if (isSection(head)) return head;
  }
  return guessSection(text, polarity);
}
