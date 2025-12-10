import { describe, expect, it } from "vitest";
import {
  createFighter,
  createHealth,
  createInput,
  createPosition,
  createVelocity,
} from "../components";

describe("components", () => {
  describe("createHealth", () => {
    it("creates health component with max as current", () => {
      const health = createHealth(100);

      expect(health.current).toBe(100);
      expect(health.max).toBe(100);
    });
  });

  describe("createPosition", () => {
    it("creates position with coordinates", () => {
      const pos = createPosition(10, 20);

      expect(pos.x).toBe(10);
      expect(pos.y).toBe(20);
    });
  });

  describe("createVelocity", () => {
    it("creates velocity with defaults", () => {
      const vel = createVelocity();

      expect(vel.vx).toBe(0);
      expect(vel.vy).toBe(0);
    });

    it("creates velocity with values", () => {
      const vel = createVelocity(5, -3);

      expect(vel.vx).toBe(5);
      expect(vel.vy).toBe(-3);
    });
  });

  describe("createFighter", () => {
    it("creates fighter with initial state", () => {
      const fighter = createFighter(true);

      expect(fighter.state).toBe("idle");
      expect(fighter.facingRight).toBe(true);
      expect(fighter.currentMove).toBeNull();
      expect(fighter.moveFrame).toBe(0);
    });
  });

  describe("createInput", () => {
    it("creates empty input actions", () => {
      const input = createInput();

      expect(input.actions).toEqual([]);
    });
  });
});
