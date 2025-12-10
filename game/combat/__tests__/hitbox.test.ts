import { describe, expect, it } from "vitest";
import {
  boxesOverlap,
  createHitbox,
  createHurtbox,
  offsetBox,
} from "../hitbox";

describe("combat/hitbox", () => {
  describe("boxesOverlap", () => {
    it("detects overlapping boxes", () => {
      const a = createHurtbox(0, 0, 50, 50);
      const b = createHurtbox(25, 25, 50, 50);

      expect(boxesOverlap(a, b)).toBe(true);
    });

    it("detects non-overlapping boxes", () => {
      const a = createHurtbox(0, 0, 50, 50);
      const b = createHurtbox(100, 100, 50, 50);

      expect(boxesOverlap(a, b)).toBe(false);
    });
  });

  describe("offsetBox", () => {
    it("offsets box position", () => {
      const box = createHurtbox(10, 20, 30, 40);
      const offset = offsetBox(box, 100, 50);

      expect(offset.x).toBe(110);
      expect(offset.y).toBe(70);
    });
  });

  describe("createHitbox", () => {
    it("creates hitbox with damage properties", () => {
      const hitbox = createHitbox(0, 0, 40, 30, 10, 15, 5, -2);

      expect(hitbox.damage).toBe(10);
      expect(hitbox.hitstun).toBe(15);
      expect(hitbox.knockbackX).toBe(5);
    });
  });
});
