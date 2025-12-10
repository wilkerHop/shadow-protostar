import { describe, expect, it } from "vitest";
import { actionNode, condition, inverter, selector, sequence } from "../nodes";
import type { BTContext } from "../types";

const mockContext: BTContext = {
  ownHealth: 50,
  ownMaxHealth: 100,
  enemyHealth: 80,
  enemyMaxHealth: 100,
  distanceToEnemy: 100,
  nearWall: false,
  projectileIncoming: false,
};

describe("ai/bt/nodes", () => {
  describe("condition", () => {
    it("returns success on true", () => {
      const node = condition(() => true);
      expect(node(mockContext)).toBe("success");
    });
  });

  describe("selector", () => {
    it("returns first success", () => {
      const node = selector(
        condition(() => false),
        condition(() => true),
      );
      expect(node(mockContext)).toBe("success");
    });
  });

  describe("sequence", () => {
    it("returns success when all succeed", () => {
      const node = sequence(
        condition(() => true),
        condition(() => true),
      );
      expect(node(mockContext)).toBe("success");
    });
  });

  describe("inverter", () => {
    it("inverts result", () => {
      const node = inverter(condition(() => true));
      expect(node(mockContext)).toBe("failure");
    });
  });

  describe("actionNode", () => {
    it("wraps action result", () => {
      const action = () => ({ status: "success" as const, action: null });
      const node = actionNode(action);
      expect(node(mockContext)).toBe("success");
    });
  });
});
