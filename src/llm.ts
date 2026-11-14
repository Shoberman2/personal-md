export interface Llm {
  readonly name: string;
  complete(prompt: string): Promise<string>;
}

export interface LlmEnv {
  PERSONAL_MD_LLM_PROVIDER?: string;
  PERSONAL_MD_LLM_API_KEY?: string;
  PERSONAL_MD_LLM_MODEL?: string;
  PERSONAL_MD_LLM_BASE_URL?: string;
  OPENAI_API_KEY?: string;
  ANTHROPIC_API_KEY?: string;
}

/** Build a provider from the environment. Returns null when the LLM step is off. */
export function llmFromEnv(env: LlmEnv, fetchImpl: typeof fetch = fetch): Llm | null {
  const provider = (env.PERSONAL_MD_LLM_PROVIDER ?? "").trim().toLowerCase();
  if (!provider || provider === "none" || provider === "off") return null;
  if (provider !== "openai" && provider !== "openai-compatible" && provider !== "anthropic") return null;
  const key = env.PERSONAL_MD_LLM_API_KEY || (provider === "anthropic" ? env.ANTHROPIC_API_KEY : env.OPENAI_API_KEY);
  if (!key) return null;
  if (provider === "anthropic") {
    return new AnthropicLlm(key, env.PERSONAL_MD_LLM_MODEL || "claude-sonnet-4-5", fetchImpl);
  }
  return new OpenAiLlm(key, env.PERSONAL_MD_LLM_MODEL || "gpt-4o-mini", env.PERSONAL_MD_LLM_BASE_URL, fetchImpl);
}

export function llmConfigured(env: LlmEnv): boolean {
  return llmFromEnv(env) !== null;
}

export class OpenAiLlm implements Llm {
  readonly name = "openai";

  constructor(
    private readonly apiKey: string,
    private readonly model: string,
    private readonly baseUrl?: string,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {}

  async complete(prompt: string): Promise<string> {
    const base = (this.baseUrl || "https://api.openai.com/v1").replace(/\/$/, "");
    const response = await this.fetchImpl(`${base}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.model,
        temperature: 0,
        messages: [
          { role: "system", content: "You rewrite personal.md rules. Return JSON only." },
          { role: "user", content: prompt },
        ],
      }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) throw new Error(`LLM request failed (${response.status}).`);
    const body = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    const content = body.choices?.[0]?.message?.content;
    if (!content) throw new Error("LLM returned an empty response.");
    return content;
  }
}

export class AnthropicLlm implements Llm {
  readonly name = "anthropic";

  constructor(
    private readonly apiKey: string,
    private readonly model: string,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {}

  async complete(prompt: string): Promise<string> {
    const response = await this.fetchImpl("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 2000,
        temperature: 0,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) throw new Error(`LLM request failed (${response.status}).`);
    const body = (await response.json()) as { content?: { text?: string }[] };
    const content = body.content?.map((block) => block.text ?? "").join("\n");
    if (!content) throw new Error("LLM returned an empty response.");
    return content;
  }
}

export function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced?.[1] ?? text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("LLM did not return JSON.");
  return JSON.parse(raw.slice(start, end + 1));
}

/** Rewrite rule statements. Evidence, ids, and polarity stay put. */
export async function tuneStatements(rules: import("./types.js").Rule[], llm: Llm): Promise<import("./types.js").Rule[]> {
  const compact = rules
    .filter((rule) => rule.kind === "rule")
    .map((rule) => ({ id: rule.id, statement: rule.statement, polarity: rule.polarity, evidence: rule.evidenceLabel }));
  if (compact.length === 0) return rules;
  const raw = await llm.complete(
    [
      "Rewrite these personal.md rule statements so they are clearer.",
      "Return JSON: {\"rules\":[{\"id\":\"...\",\"statement\":\"...\"}]}",
      "Do not add or remove ids. Do not change the decision. Keep each statement under 280 characters.",
      "Do not include repository file contents, secrets, or private names that are not already in the statement.",
      JSON.stringify({ rules: compact }),
    ].join("\n"),
  );
  const parsed = extractJson(raw);
  const record = parsed as { rules?: { id?: string; statement?: string }[] };
  const updates = new Map<string, string>();
  for (const item of record.rules ?? []) {
    if (!item.id || typeof item.statement !== "string") continue;
    const statement = item.statement.trim();
    if (statement.length < 8 || statement.length > 320) continue;
    if (/```|ghp_|sk-|AKIA/.test(statement)) continue;
    updates.set(item.id, statement);
  }
  return rules.map((rule) => (updates.has(rule.id) ? { ...rule, statement: updates.get(rule.id) as string } : rule));
}
