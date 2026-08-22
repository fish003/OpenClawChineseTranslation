import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const workflow = readFileSync(new URL("../../.github/workflows/build-core.yml", import.meta.url), "utf8");

test("build-core supports current upstream .mts build scripts", () => {
  assert.match(workflow, /run_optional_script scripts\/tsdown-build true/);
  assert.match(workflow, /node --import tsx "\$\{base\}\.mts"/);
  assert.match(workflow, /run_optional_script scripts\/build-stamp false/);
  assert.match(workflow, /run_optional_script scripts\/runtime-postbuild-stamp false/);
});

test("build-core no longer hard-codes removed .mjs build entrypoints", () => {
  assert.doesNotMatch(workflow, /^\s*node scripts\/tsdown-build\.mjs\s*$/m);
  assert.doesNotMatch(workflow, /^\s*node scripts\/build-stamp\.mjs \|\| true\s*$/m);
});
