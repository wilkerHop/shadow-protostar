import { describe, expect, it } from "vitest";
import { LIGHT_PUNCH } from "../../combat/attack-data";
import { createFighterEntity, startAttack } from "../../fighter/entity";
import {
  ARENA_HEIGHT,
  ARENA_WIDTH,
  createBTContext,
  FLOOR_Y,
  getTotalAttackFrames,
} from "../scene-config";

describe("scenes/scene-config", () => {
  describe("constants", () => {
    it("has valid arena dimensions", () => {
      expect(ARENA_WIDTH).toBe(800);
      expect(ARENA_HEIGHT).toBe(600);
      expect(FLOOR_Y).toBe(550);
    });
  });

  describe("createBTContext", () => {
    it("creates context with distance calculation", () => {
      const e1 = createFighterEntity(1, true);
      const e2 = createFighterEntity(2, false);
      const ctx = createBTContext(e1, e2, 100, 300);

      expect(ctx.distanceToEnemy).toBe(200);
      expect(ctx.ownHealth).toBe(100);
    });
  });

  describe("getTotalAttackFrames", () => {
    it("returns default for no attack", () => {
      const entity = createFighterEntity(1, true);
      expect(getTotalAttackFrames(entity)).toBe(14);
    });

    it("calculates total from attack data", () => {
      const entity = startAttack(createFighterEntity(1, true), LIGHT_PUNCH);
      const expected =
        LIGHT_PUNCH.startupFrames +
        LIGHT_PUNCH.activeFrames +
        LIGHT_PUNCH.recoveryFrames;
      expect(getTotalAttackFrames(entity)).toBe(expected);
    });
  });
});
