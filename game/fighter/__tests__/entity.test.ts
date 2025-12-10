import { describe, expect, it } from "vitest";
import { LIGHT_PUNCH } from "../../combat/attack-data";
import {
  applyHit,
  createFighterEntity,
  startAttack,
  updateEntityState,
} from "../entity";

describe("fighter/entity", () => {
  describe("createFighterEntity", () => {
    it("creates entity with default values", () => {
      const entity = createFighterEntity(1, true);

      expect(entity.id).toBe(1);
      expect(entity.context.health).toBe(100);
      expect(entity.context.facingRight).toBe(true);
    });
  });

  describe("updateEntityState", () => {
    it("ticks the context", () => {
      const entity = createFighterEntity(1, true);
      const result = updateEntityState(entity);

      expect(result.context.stateFrame).toBe(1);
    });
  });

  describe("startAttack", () => {
    it("sets current attack", () => {
      const entity = createFighterEntity(1, true);
      const result = startAttack(entity, LIGHT_PUNCH);

      expect(result.currentAttack).toBe(LIGHT_PUNCH);
      expect(result.context.state).toBe("attacking");
    });
  });

  describe("applyHit", () => {
    it("reduces health and sets hitstun", () => {
      const entity = createFighterEntity(1, true);
      const result = applyHit(entity, 20, 15);

      expect(result.context.health).toBe(80);
      expect(result.context.state).toBe("hitstun");
    });
  });
});
