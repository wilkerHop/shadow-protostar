import { describe, expect, it } from "vitest";
import { createHazard, spawnRandomHazard } from "../hazards";

describe("arena/hazards", () => {
  describe("createHazard", () => {
    it("creates spike hazard", () => {
      const hazard = createHazard("spike", 100, 500);

      expect(hazard.type).toBe("spike");
      expect(hazard.x).toBe(100);
      expect(hazard.damage).toBe(5);
      expect(hazard.active).toBe(true);
    });

    it("creates fire hazard", () => {
      const hazard = createHazard("fire", 200, 500);

      expect(hazard.type).toBe("fire");
      expect(hazard.damage).toBe(3);
    });
  });

  describe("spawnRandomHazard", () => {
    it("spawns hazard within arena bounds", () => {
      const hazard = spawnRandomHazard(50, 750, 550);

      expect(hazard.x).toBeGreaterThanOrEqual(50);
      expect(hazard.x).toBeLessThan(750);
      expect(hazard.active).toBe(true);
    });
  });
});
