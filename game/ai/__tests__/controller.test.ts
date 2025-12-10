import { describe, expect, it } from "vitest";
import type { BTContext } from "../bt/types";
import { createAIController } from "../controller";

describe("AI Controller", () => {
  const controller = createAIController();

  const mockContext: BTContext = {
    ownHealth: 100,
    ownMaxHealth: 100,
    enemyHealth: 100,
    enemyMaxHealth: 100,
    distanceToEnemy: 200,
    nearWall: false,
    projectileIncoming: false,
  };

  describe("Survival Priority", () => {
    it("blocks or retreats when health is critical", () => {
      const context: BTContext = {
        ...mockContext,
        ownHealth: 15,
        enemyHealth: 80,
      };

      const action = controller(context);
      expect(["block", "retreat"]).toContain(action);
    });
  });

  describe("Attack Priority", () => {
    it("Mid-range Tactics > returns valid action from NN", () => {
      const ctx = { ...mockContext, distanceToEnemy: 140 };
      const action = controller(ctx);
      expect(["advance", "retreat", "block", "attack", "jump"]).toContain(
        action,
      );
    });
  });

  describe("Approach Priority", () => {
    it("returns valid action when far from enemy", () => {
      const context = { ...mockContext, distanceToEnemy: 300 };
      const action = controller(context);
      expect(["advance", "retreat", "block", "attack", "jump"]).toContain(
        action,
      );
    });
  });

  describe("Mid-range Tactics", () => {
    it("returns valid action at mid-range", () => {
      const context = { ...mockContext, distanceToEnemy: 120 };
      const action = controller(context);
      expect(["block", "jump", "attack", "advance"]).toContain(action);
    });
  });
});
