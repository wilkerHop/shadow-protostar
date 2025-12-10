import { describe, expect, it } from "vitest";
import {
  createRandomDare,
  isDareComplete,
  updateDareProgress,
} from "../manager";

describe("dares/manager", () => {
  describe("createRandomDare", () => {
    it("creates a dare with valid properties", () => {
      const dare = createRandomDare();

      expect(dare.id).toBeDefined();
      expect(dare.type).toBeDefined();
      expect(dare.description).toBeDefined();
      expect(dare.target).toBeGreaterThan(0);
      expect(dare.progress).toBe(0);
      expect(dare.completed).toBe(false);
    });
  });

  describe("updateDareProgress", () => {
    it("increments progress", () => {
      const dare = createRandomDare();
      const updated = updateDareProgress(dare, 1);

      expect(updated.progress).toBe(1);
    });

    it("marks as completed when target reached", () => {
      const dare = { ...createRandomDare(), target: 2, progress: 1 };
      const updated = updateDareProgress(dare, 1);

      expect(updated.progress).toBe(2);
      expect(updated.completed).toBe(true);
    });

    it("caps progress at target", () => {
      const dare = { ...createRandomDare(), target: 3, progress: 2 };
      const updated = updateDareProgress(dare, 5);

      expect(updated.progress).toBe(3);
    });
  });

  describe("isDareComplete", () => {
    it("returns false for incomplete dare", () => {
      const dare = createRandomDare();

      expect(isDareComplete(dare)).toBe(false);
    });

    it("returns true for completed dare", () => {
      const dare = { ...createRandomDare(), completed: true };

      expect(isDareComplete(dare)).toBe(true);
    });
  });
});
