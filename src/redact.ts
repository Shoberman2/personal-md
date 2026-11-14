const SECRET =
  /\b(gh[pousr]_[A-Za-z0-9_]{10,}|github_pat_[A-Za-z0-9_]{10,}|sk-[A-Za-z0-9]{16,}|sk-ant-[A-Za-z0-9_-]{16,}|xox[baprs]-[A-Za-z0-9-]{10,}|AKIA[0-9A-Z]{16}|eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{8,})\b|-----BEGIN [A-Z ]*PRIVATE KEY-----/g;

/** Replace token-shaped strings. personal.md should never store credentials. */
export function redact(text: string): string {
  return text
    .replace(SECRET, "[redacted]")
    .replace(/([?&](?:access_)?token=)[^&\s]+/gi, "$1[redacted]");
}
