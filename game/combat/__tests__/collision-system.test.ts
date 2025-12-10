import { describe, expect, it } from "vitest";
import { checkCollision, type Fighter } from "../collision-system";
import { createHitbox, createHurtbox } from "../hitbox";

describe("combat/collision-system", () => {
  const createTestFighter = (x: number, facingRight: boolean): Fighter => ({
    x,
    y: 0,
    facingRight,
    activeHitbox: null,
    hurtbox: createHurtbox(-20, -40, 40, 80),
  });

  describe("checkCollision", () => {
    it("returns no hit when no active hitbox", () => {
      const attacker = createTestFighter(0, true);
      const defender = createTestFighter(50, false);

      const result = checkCollision(attacker, defender);

      expect(result.hit).toBe(false);
    });

    it("returns hit when hitbox overlaps hurtbox", () => {
      const attacker: Fighter = {
        ...createTestFighter(0, true),
        activeHitbox: createHitbox(20, -20, 50, 40, 10, 15, 5, 0),
      };
      const defender = createTestFighter(50, false);

      const result = checkCollision(attacker, defender);

      expect(result.hit).toBe(true);
      expect(result.damage).toBe(10);
    });

    it("returns no hit when boxes don't overlap", () => {
      const attacker: Fighter = {
        ...createTestFighter(0, true),
        activeHitbox: createHitbox(20, -20, 20, 20, 10, 15, 5, 0),
      };
      const defender = createTestFighter(200, false);

      const result = checkCollision(attacker, defender);

      expect(result.hit).toBe(false);
    });
  });
});
