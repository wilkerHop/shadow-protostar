import { describe, expect, it } from "vitest";
import {
  getActiveHitbox,
  getAttackPhase,
  isAttackComplete,
  LIGHT_PUNCH,
} from "../attack-data";

describe("combat/attack-data", () => {
  describe("getAttackPhase", () => {
    it("returns startup for early frames", () => {
      expect(getAttackPhase(LIGHT_PUNCH, 0)).toBe("startup");
      expect(getAttackPhase(LIGHT_PUNCH, 2)).toBe("startup");
    });

    it("returns active during hitbox frames", () => {
      expect(getAttackPhase(LIGHT_PUNCH, 3)).toBe("active");
      expect(getAttackPhase(LIGHT_PUNCH, 5)).toBe("active");
    });

    it("returns recovery after active", () => {
      // LIGHT_PUNCH: startup=3, active=5, so recovery starts at frame 8
      expect(getAttackPhase(LIGHT_PUNCH, 8)).toBe("recovery");
    });
  });

  describe("isAttackComplete", () => {
    it("returns false during attack", () => {
      expect(isAttackComplete(LIGHT_PUNCH, 5)).toBe(false);
    });

    it("returns true after all frames", () => {
      expect(isAttackComplete(LIGHT_PUNCH, 14)).toBe(true);
    });
  });

  describe("getActiveHitbox", () => {
    it("returns null during startup", () => {
      expect(getActiveHitbox(LIGHT_PUNCH, 0)).toBeNull();
    });

    it("returns hitbox during active", () => {
      expect(getActiveHitbox(LIGHT_PUNCH, 4)).not.toBeNull();
    });

    it("returns null during recovery", () => {
      expect(getActiveHitbox(LIGHT_PUNCH, 10)).toBeNull();
    });
  });
});
