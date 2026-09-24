"use strict";
import vec3 from "vec3";
import BaseSkill from "./base.js";

const REFERENCE_OFFSETS = [
  [1, -1, 0],
  [-1, -1, 0],
  [0, -1, 1],
  [0, -1, -1],
];

class PlaceBlockSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const itemName = opts.itemName.toLowerCase().replaceAll(" ", "_");
    const item = this.bot.inventory
      .items()
      .find((candidate) => candidate.name.includes(itemName));

    if (!item) {
      return this.fail(`I do not have any ${opts.itemName}`);
    }

    const position = this.bot.entity.position.floored();
    let referenceBlock;

    for (const [dx, dy, dz] of REFERENCE_OFFSETS) {
      const candidateReference = this.bot.blockAt(position.offset(dx, dy, dz));
      const candidateTarget = this.bot.blockAt(position.offset(dx, dy + 1, dz));

      if (
        candidateReference &&
        candidateReference.boundingBox === "block" &&
        candidateTarget &&
        candidateTarget.name === "air"
      ) {
        referenceBlock = candidateReference;
        break;
      }
    }

    if (!referenceBlock) {
      return this.fail("There is no space to place a block here");
    }

    await this.bot.equip(item, "hand");
    await this.bot.placeBlock(referenceBlock, new vec3.Vec3(0, 1, 0));
  }
}

export { PlaceBlockSkill as default };
