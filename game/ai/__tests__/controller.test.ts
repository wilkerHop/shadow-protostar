import { describe, expect, it } from "vitest";
import type { BTContext } from "../bt/types";
import { createAIController } from "../controller";

describe("AI Controller", () => {
  const controller = createAIController();

  describe("Survival Priority (Priority 0)", () => {
    it("forces block when health is critical", () => {
      const context: BTContext = {
        ownHealth: 20,
        ownMaxHealth: 100,
        enemyHealth: 80,
        enemyMaxHealth: 100,
        distanceToEnemy: 200,
        nearWall: false,
        projectileIncoming: false,
      };

      expect(controller(context)).toBe("block");
    });

    it("forces block when projectile incoming", () => {
      const context: BTContext = {
        ownHealth: 80,
        ownMaxHealth: 100,
        enemyHealth: 80,
        enemyMaxHealth: 100,
        distanceToEnemy: 200,
        nearWall: false,
        projectileIncoming: true,
      };

      expect(controller(context)).toBe("block");
    });
  });

  describe("Eliminate Priority (Priority 1)", () => {
    it("forces attack when enemy low and safe", () => {
      const context: BTContext = {
        ownHealth: 80,
        ownMaxHealth: 100,
        enemyHealth: 15,
        enemyMaxHealth: 100,
        distanceToEnemy: 150,
        nearWall: false,
        projectileIncoming: false,
      };

      expect(controller(context)).toBe("attack");
    });
  });

  describe("Neural Network (Priority 2)", () => {
    it("uses NN when no priority conditions met", () => {
      const context: BTContext = {
        ownHealth: 80,
        ownMaxHealth: 100,
        enemyHealth: 80,
        enemyMaxHealth: 100,
        distanceToEnemy: 200,
        nearWall: false,
        projectileIncoming: false,
      };

      const action = controller(context);
      expect(["block", "jump", "attack", "advance"]).toContain(action);
    });
  });
});
