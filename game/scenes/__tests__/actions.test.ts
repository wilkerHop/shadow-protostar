import { describe, expect, it, vi } from "vitest";
import { applyAction } from "../actions";

describe("scenes/actions", () => {
  const mockMatter = {
    body: {
      applyForce: vi.fn(),
    },
  } as unknown as Phaser.Physics.Matter.MatterPhysics;

  const mockTarget = {
    body: {
      position: { x: 100, y: 100 },
      velocity: { y: 0 },
    } as MatterJS.BodyType,
    facingRight: true,
  };

  describe("applyAction", () => {
    it("applies force for advance action", () => {
      applyAction("advance", mockTarget, mockMatter);
      expect(mockMatter.body.applyForce).toHaveBeenCalled();
    });

    it("applies force for retreat action", () => {
      applyAction("retreat", mockTarget, mockMatter);
      expect(mockMatter.body.applyForce).toHaveBeenCalled();
    });

    it("handles block action without error", () => {
      expect(() => applyAction("block", mockTarget, mockMatter)).not.toThrow();
    });

    it("handles attack action without error", () => {
      expect(() => applyAction("attack", mockTarget, mockMatter)).not.toThrow();
    });
  });
});
