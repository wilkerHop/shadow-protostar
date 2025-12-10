import { describe, expect, it } from "vitest";
import {
  createComboState,
  getComboMultiplier,
  registerHit,
  updateCombo,
} from "../combo-tracker";

describe("combat/combo-tracker", () => {
  describe("registerHit", () => {
    it("increments hit count", () => {
      const state = createComboState();
      const result = registerHit(state, 10, 100);

      expect(result.hitCount).toBe(1);
      expect(result.totalDamage).toBe(10);
      expect(result.isActive).toBe(true);
    });
  });

  describe("updateCombo", () => {
    it("resets after timeout", () => {
      const state = registerHit(createComboState(), 10, 0);
      const result = updateCombo(state, 100); // Well past timeout

      expect(result.isActive).toBe(false);
      expect(result.hitCount).toBe(0);
    });

    it("maintains combo within timeout", () => {
      const state = registerHit(createComboState(), 10, 50);
      const result = updateCombo(state, 70);

      expect(result.isActive).toBe(true);
    });
  });

  describe("getComboMultiplier", () => {
    it("returns 1 for low combos", () => {
      expect(getComboMultiplier(1)).toBe(1);
      expect(getComboMultiplier(2)).toBe(1);
    });

    it("increases for higher combos", () => {
      expect(getComboMultiplier(5)).toBe(1.2);
      expect(getComboMultiplier(10)).toBe(1.5);
    });
  });
});
