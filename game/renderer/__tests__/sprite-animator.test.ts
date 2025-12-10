import { describe, expect, it } from "vitest";
import {
  DEFAULT_SPRITE_CONFIG,
  getCurrentFrame,
  getFrameIndex,
} from "../sprite-animator";

describe("renderer/sprite-animator", () => {
  describe("getFrameIndex", () => {
    it("returns correct frame for looping animation", () => {
      const animation = DEFAULT_SPRITE_CONFIG.idle; // 4 frames, 8 fps
      expect(getFrameIndex(animation, 0)).toBe(0);
      expect(getFrameIndex(animation, 8)).toBe(1); // 60/8 = ~7.5 frames per anim frame
    });

    it("clamps frame for non-looping animation", () => {
      const animation = DEFAULT_SPRITE_CONFIG.attacking; // 4 frames, non-looping
      expect(getFrameIndex(animation, 100)).toBe(3);
    });
  });

  describe("getCurrentFrame", () => {
    it("returns frame data for state", () => {
      const frame = getCurrentFrame(DEFAULT_SPRITE_CONFIG, "idle", 0);

      expect(frame.x).toBe(0);
      expect(frame.y).toBe(0);
      expect(frame.width).toBe(64);
    });
  });
});
