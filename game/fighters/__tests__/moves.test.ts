import { describe, expect, it } from "vitest";
import { FIREBALL, GRAB, JAB, KICK } from "../moves";

describe("fighters/moves", () => {
  describe("JAB", () => {
    it("has strike type", () => {
      expect(JAB.type).toBe("strike");
      expect(JAB.damage).toBe(5);
    });
  });

  describe("KICK", () => {
    it("has strike type", () => {
      expect(KICK.type).toBe("strike");
      expect(KICK.damage).toBe(8);
    });
  });

  describe("FIREBALL", () => {
    it("has projectile type", () => {
      expect(FIREBALL.type).toBe("projectile");
      expect(FIREBALL.damage).toBe(10);
    });
  });

  describe("GRAB", () => {
    it("has grab type", () => {
      expect(GRAB.type).toBe("grab");
      expect(GRAB.damage).toBe(0);
    });
  });
});
