import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { RELAY_V1_OPERATIONS } from "@relaymessenger/sdk";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const expected = (
  await readFile(resolve(root, "contracts/sdk-v1-operations.sha256"), "utf8")
).trim();
const actual = createHash("sha256")
  .update(JSON.stringify(RELAY_V1_OPERATIONS))
  .digest("hex");

assert.equal(
  actual,
  expected,
  "The SDK v1 operation contract changed; review the public contract before refreshing this hash.",
);
assert.equal(RELAY_V1_OPERATIONS.length, 34);
console.log(`SDK v1 contract hash OK: ${actual}`);
