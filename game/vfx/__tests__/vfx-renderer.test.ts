import { describe, expect, it } from "vitest";
import { getStateColor } from "../vfx-renderer";

describe("vfx/vfx-renderer", () => {
  describe("getStateColor", () => {
    it("returns white for attacking", () => {
      expect(getStateColor("attacking", 0x3b82f6)).toBe(0xffffff);
    });

    it("returns red for hitstun", () => {
      expect(getStateColor("hitstun", 0x3b82f6)).toBe(0xff0000);
    });

    it("returns green for blocking", () => {
      expect(getStateColor("blocking", 0x3b82f6)).toBe(0x00ff00);
    });

    it("returns base color for idle", () => {
      expect(getStateColor("idle", 0x3b82f6)).toBe(0x3b82f6);
    });
  });
});
