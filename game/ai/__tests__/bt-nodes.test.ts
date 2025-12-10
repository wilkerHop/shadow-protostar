import { describe, expect, it } from "vitest";
import { condition, inverter, selector, sequence } from "@/game/ai/bt/nodes";
import type { BTContext } from "@/game/ai/bt/types";

const mockContext: BTContext = {
  ownHealth: 50,
  ownMaxHealth: 100,
  enemyHealth: 80,
  enemyMaxHealth: 100,
  distanceToEnemy: 100,
  nearWall: false,
  projectileIncoming: false,
};

describe("bt/nodes", () => {
  describe("condition", () => {
    it("returns success when predicate is true", () => {
      const node = condition(() => true);
      expect(node(mockContext)).toBe("success");
    });

    it("returns failure when predicate is false", () => {
      const node = condition(() => false);
      expect(node(mockContext)).toBe("failure");
    });
  });

  describe("selector", () => {
    it("returns success on first successful child", () => {
      const node = selector(
        condition(() => false),
        condition(() => true),
        condition(() => true),
      );
      expect(node(mockContext)).toBe("success");
    });

    it("returns failure when all children fail", () => {
      const node = selector(
        condition(() => false),
        condition(() => false),
      );
      expect(node(mockContext)).toBe("failure");
    });
  });

  describe("sequence", () => {
    it("returns success when all children succeed", () => {
      const node = sequence(
        condition(() => true),
        condition(() => true),
      );
      expect(node(mockContext)).toBe("success");
    });

    it("returns failure on first failing child", () => {
      const node = sequence(
        condition(() => true),
        condition(() => false),
        condition(() => true),
      );
      expect(node(mockContext)).toBe("failure");
    });
  });

  describe("inverter", () => {
    it("inverts success to failure", () => {
      const node = inverter(condition(() => true));
      expect(node(mockContext)).toBe("failure");
    });

    it("inverts failure to success", () => {
      const node = inverter(condition(() => false));
      expect(node(mockContext)).toBe("success");
    });
  });
});
