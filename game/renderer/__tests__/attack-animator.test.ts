import { describe, expect, it } from "vitest";
import {
  getAttackLimbOffsets,
  getHitstunOffsets,
  getIdleLimbOffsets,
  getLimbOffsets,
} from "../attack-animator";

describe("renderer/attack-animator", () => {
  describe("getAttackLimbOffsets", () => {
    it("winds back during startup phase", () => {
      const offsets = getAttackLimbOffsets(2, 20, true);
      expect(offsets.armX).toBeLessThan(0);
    });

    it("extends forward during active phase", () => {
      const offsets = getAttackLimbOffsets(8, 20, true);
      expect(offsets.armX).toBeGreaterThan(30);
    });

    it("returns to neutral during recovery", () => {
      const offsets = getAttackLimbOffsets(15, 20, true);
      expect(offsets.armX).toBeLessThan(25);
    });
  });

  describe("getIdleLimbOffsets", () => {
    it("returns breathing offsets", () => {
      const offsets = getIdleLimbOffsets(0, true);
      expect(offsets.armX).toBeGreaterThan(0);
    });
  });

  describe("getHitstunOffsets", () => {
    it("returns recoil offsets", () => {
      const offsets = getHitstunOffsets(0, true);
      expect(offsets.armY).toBeGreaterThan(0);
    });
  });

  describe("getLimbOffsets", () => {
    it("uses attack offsets when attacking", () => {
      const offsets = getLimbOffsets("attacking", 0, 8, 20, true);
      expect(offsets.armX).toBeGreaterThan(30);
    });

    it("uses idle offsets when idle", () => {
      const offsets = getLimbOffsets("idle", 0, 0, 0, true);
      expect(offsets.armX).toBeGreaterThan(0);
    });
  });
});
