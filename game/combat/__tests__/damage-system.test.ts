import { describe, expect, it } from "vitest";
import { createFighterContext } from "../../fighter/state-machine";
import type { HitResult } from "../collision-system";
import { applyBlockDamage, applyDamage, isKO } from "../damage-system";

describe("combat/damage-system", () => {
  const hitResult: HitResult = {
    hit: true,
    damage: 10,
    hitstun: 15,
    knockbackX: 5,
    knockbackY: 0,
  };

  describe("applyDamage", () => {
    it("reduces health on hit", () => {
      const ctx = createFighterContext(true);
      const result = applyDamage(ctx, hitResult);

      expect(result.health).toBe(90);
      expect(result.state).toBe("hitstun");
      expect(result.hitstunRemaining).toBe(15);
    });

    it("does nothing on no hit", () => {
      const ctx = createFighterContext(true);
      const noHit: HitResult = {
        hit: false,
        damage: 0,
        hitstun: 0,
        knockbackX: 0,
        knockbackY: 0,
      };
      const result = applyDamage(ctx, noHit);

      expect(result.health).toBe(100);
    });
  });

  describe("applyBlockDamage", () => {
    it("applies chip damage", () => {
      const ctx = createFighterContext(true);
      const result = applyBlockDamage(ctx, hitResult);

      expect(result.health).toBe(99); // 10 * 0.1 = 1 chip
      expect(result.blockstunRemaining).toBe(9); // 15 * 0.6 = 9
    });
  });

  describe("isKO", () => {
    it("returns false when health > 0", () => {
      const ctx = createFighterContext(true);
      expect(isKO(ctx)).toBe(false);
    });

    it("returns true when health = 0", () => {
      const ctx = { ...createFighterContext(true), health: 0 };
      expect(isKO(ctx)).toBe(true);
    });
  });
});
