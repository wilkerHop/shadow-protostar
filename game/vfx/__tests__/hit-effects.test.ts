import { describe, expect, it } from "vitest";
import {
  createVFXState,
  getShakeOffset,
  spawnHitEffect,
  triggerScreenShake,
  updateVFX,
} from "../hit-effects";

describe("vfx/hit-effects", () => {
  describe("spawnHitEffect", () => {
    it("adds hit effect to state", () => {
      const state = createVFXState();
      const result = spawnHitEffect(state, 100, 200, "light");

      expect(result.hitEffects).toHaveLength(1);
      expect(result.hitEffects[0]?.x).toBe(100);
    });
  });

  describe("triggerScreenShake", () => {
    it("sets screen shake", () => {
      const state = createVFXState();
      const result = triggerScreenShake(state, 5, 10);

      expect(result.screenShake?.intensity).toBe(5);
      expect(result.screenShake?.duration).toBe(10);
    });
  });

  describe("updateVFX", () => {
    it("advances effect frames", () => {
      const state = spawnHitEffect(createVFXState(), 0, 0, "light");
      const result = updateVFX(state);

      expect(result.hitEffects[0]?.frame).toBe(1);
    });

    it("removes expired effects", () => {
      const state = {
        hitEffects: [
          { x: 0, y: 0, frame: 11, maxFrames: 12, type: "light" as const },
        ],
        screenShake: null,
      };
      const result = updateVFX(state);

      expect(result.hitEffects).toHaveLength(0);
    });
  });

  describe("getShakeOffset", () => {
    it("returns zero for null shake", () => {
      const result = getShakeOffset(null);
      expect(result.x).toBe(0);
      expect(result.y).toBe(0);
    });
  });
});
