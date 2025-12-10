import { describe, expect, it } from "vitest";
import { createTacticalNN } from "../model";

describe("ai/nn/model", () => {
  describe("createTacticalNN", () => {
    it("creates NN with predict function", () => {
      const nn = createTacticalNN();

      expect(nn.predict).toBeDefined();
      expect(typeof nn.predict).toBe("function");
    });

    it("returns output with expected shape", () => {
      const nn = createTacticalNN();
      const output = nn.predict({
        distanceToEnemy: 0.5,
        enemyX: 0.5,
        enemyY: 0.5,
        ownHealthPercent: 0.8,
        enemyHealthPercent: 0.6,
        nearWall: 0,
        projectileIncoming: 0,
      });

      expect(output.block).toBeDefined();
      expect(output.jump).toBeDefined();
      expect(output.attack).toBeDefined();
      expect(output.move).toBeDefined();
    });
  });
});
