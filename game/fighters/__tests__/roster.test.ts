import { describe, expect, it } from "vitest";
import { PROTO, ROSTER, SHADOW } from "../roster";

describe("fighters/roster", () => {
  describe("SHADOW", () => {
    it("has correct base config", () => {
      expect(SHADOW.name).toBe("Shadow");
      expect(SHADOW.health).toBe(100);
      expect(SHADOW.moves.jab).toBeDefined();
      expect(SHADOW.moves.special1).toBeDefined();
    });
  });

  describe("PROTO", () => {
    it("has correct base config", () => {
      expect(PROTO.name).toBe("Proto");
      expect(PROTO.health).toBe(110);
      expect(PROTO.moves.special1).toBeDefined();
    });
  });

  describe("ROSTER", () => {
    it("contains both fighters", () => {
      expect(ROSTER).toHaveLength(2);
      expect(ROSTER).toContain(SHADOW);
      expect(ROSTER).toContain(PROTO);
    });
  });
});
