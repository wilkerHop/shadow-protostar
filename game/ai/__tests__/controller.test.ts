import { describe, expect, it } from "vitest";
import type { BTContext } from "../bt/types";
import { createAIController } from "../controller";

describe("AI Controller", () => {
  const controller = createAIController();

  describe("Survival Priority", () => {
    it("blocks or retreats when health is critical", () => {
      const context: BTContext = {
        ownHealth: 15,
        ownMaxHealth: 100,
        enemyHealth: 80,
        enemyMaxHealth: 100,
        distanceToEnemy: 200,
        nearWall: false,
        projectileIncoming: false,
      };

      const action = controller(context);
      expect(["block", "retreat"]).toContain(action);
    });
  });

  describe("Attack Priority", () => {
    it("attacks when in close range", () => {
      const context: BTContext = {
        ownHealth: 80,
        ownMaxHealth: 100,
        enemyHealth: 80,
        enemyMaxHealth: 100,
        distanceToEnemy: 50,
        nearWall: false,
        projectileIncoming: false,
      };

      const action = controller(context);
      expect(["attack", "block"]).toContain(action);
    });
  });

  describe("Approach Priority", () => {
    it("advances when far from enemy", () => {
      const context: BTContext = {
        ownHealth: 80,
        ownMaxHealth: 100,
        enemyHealth: 80,
        enemyMaxHealth: 100,
        distanceToEnemy: 300,
        nearWall: false,
        projectileIncoming: false,
      };

      expect(controller(context)).toBe("advance");
    });
  });

  describe("Mid-range Tactics", () => {
    it("returns valid action at mid-range", () => {
      const context: BTContext = {
        ownHealth: 80,
        ownMaxHealth: 100,
        enemyHealth: 80,
        enemyMaxHealth: 100,
        distanceToEnemy: 120,
        nearWall: false,
        projectileIncoming: false,
      };

      const action = controller(context);
      expect(["block", "jump", "attack", "advance"]).toContain(action);
    });
  });
});
