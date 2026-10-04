#!/usr/bin/env node

// Pre-commit guard: every dictionaries/pages/*.ts file carries a
// `schemas.pageDates = { published, modified }` per language, which feeds
// WebPage.datePublished/dateModified (and, for services, every Service
// entity's dates too — see shared/seo/schemas/services.ts). Search engines
// cross-check `modified` against reality, so if a commit changes a page's
// content without also touching that page's `modified` field, block it
// here rather than let the date go stale silently.
//
// Heuristic, not a parser: within one file's diff, any changed line that
// isn't the `pageDates: { ... }` line itself counts as "content changed";
// a changed line containing `modified:` counts as "modified bumped". Not
// precise per-language (en vs de), but good enough as a nudge.

const { execSync } = require("node:child_process");
const { globSync } = require("node:fs");

const files = globSync("dictionaries/pages/*.ts");
let failed = false;

for (const file of files) {
  const diff = execSync(`git diff --cached -U0 -- "${file}"`).toString();
  if (!diff.trim()) continue;

  const changedLines = diff
    .split("\n")
    .filter((line) => (line.startsWith("+") || line.startsWith("-")) && !line.startsWith("+++") && !line.startsWith("---"));

  const touchedModified = changedLines.some((line) => /modified:\s*"/.test(line));
  const touchedOtherContent = changedLines.some((line) => !/pageDates:\s*\{/.test(line));

  if (touchedOtherContent && !touchedModified) {
    console.error(`✗ ${file} changed but schemas.pageDates.modified wasn't bumped.`);
    failed = true;
  }
}

if (failed) {
  console.error("\nUpdate the relevant pageDates.modified field(s) to today's date, then re-stage and commit.");
  console.error("(If this change truly isn't content — e.g. a type refactor — commit with --no-verify.)");
  process.exit(1);
}
