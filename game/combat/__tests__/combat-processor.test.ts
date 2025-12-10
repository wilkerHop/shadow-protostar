import { describe, expect, it } from "vitest";
import { createFighterEntity } from "../../fighter/entity";
import { executeAttack, processCombat } from "../combat-processor";

describe("combat/combat-processor", () => {
  describe("executeAttack", () => {
    it("starts attack if not already attacking", () => {
      const entity = createFighterEntity(1, true);
      const result = executeAttack(entity);

      expect(result.currentAttack).not.toBeNull();
      expect(result.context.state).toBe("attacking");
    });

    it("does not attack if in hitstun", () => {
      const entity = {
        ...createFighterEntity(1, true),
        context: {
          ...createFighterEntity(1, true).context,
          state: "hitstun" as const,
        },
      };
      const result = executeAttack(entity);

      expect(result.currentAttack).toBeNull();
    });
  });

  describe("processCombat", () => {
    it("returns unchanged entities when no attacks", () => {
      const e1 = createFighterEntity(1, true);
      const e2 = createFighterEntity(2, false);

      const result = processCombat(e1, e2, 100, 100, 200, 100);

      expect(result.entity1.context.health).toBe(100);
      expect(result.entity2.context.health).toBe(100);
      expect(result.hits).toHaveLength(0);
    });
  });
});
