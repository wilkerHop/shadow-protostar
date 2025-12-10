import { describe, expect, it } from "vitest";
import {
  createArenaState,
  getArenaWidth,
  isArenaShrinking,
  updateArena,
} from "../state";

describe("arena/state", () => {
  describe("createArenaState", () => {
    it("creates initial arena state", () => {
      const state = createArenaState();

      expect(state.leftWallX).toBe(20);
      expect(state.rightWallX).toBe(780);
      expect(state.shrinkSpeed).toBe(0.5);
    });
  });

  describe("getArenaWidth", () => {
    it("calculates arena width", () => {
      const state = createArenaState();

      expect(getArenaWidth(state)).toBe(760);
    });
  });

  describe("updateArena", () => {
    it("resets stale timer when damage occurs", () => {
      const state = createArenaState();
      const now = Date.now();
      const updated = updateArena(state, now, true);

      expect(updated.staleTimer).toBe(0);
    });

    it("shrinks when fight is stale", () => {
      const state = {
        ...createArenaState(),
        lastDamageTime: Date.now() - 6000, // 6 seconds ago
      };
      const updated = updateArena(state, Date.now(), false);

      expect(updated.leftWallX).toBeGreaterThan(state.leftWallX);
      expect(updated.rightWallX).toBeLessThan(state.rightWallX);
    });
  });

  describe("isArenaShrinking", () => {
    it("returns false when fresh", () => {
      const state = createArenaState();

      expect(isArenaShrinking(state)).toBe(false);
    });
  });
});
