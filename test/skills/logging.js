"use strict";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import referee from "@sinonjs/referee";

const assert = referee.assert;
const TEST_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_DIRECTORY = path.resolve(TEST_DIRECTORY, "../../lib/skills");

describe("Skill success logging", () => {
  it("should log a natural success from every concrete skill", () => {
    const skillFiles = fs
      .readdirSync(SKILLS_DIRECTORY)
      .filter((file) => file.endsWith(".js") && file !== "base.js");

    for (const skillFile of skillFiles) {
      const source = fs.readFileSync(
        path.join(SKILLS_DIRECTORY, skillFile),
        "utf8",
      );
      assert.match(
        source,
        /bag\.logStepItemSuccess\(/,
        `${skillFile} should log its successful outcome`,
      );
      assert.isFalse(
        source.includes("accomplished"),
        `${skillFile} should use natural outcome wording`,
      );
    }
  });
});
