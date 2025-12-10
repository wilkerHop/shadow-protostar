import { describe, expect, it } from "vitest";
import { createFighterEntity } from "../../fighter/entity";
import { createVFXState } from "../../vfx/hit-effects";
import { type GameLoopState, processAction, tickGameLoop } from "../game-loop";

describe("scenes/game-loop", () => {
  const createState = (): GameLoopState => ({
    entity1: createFighterEntity(1, true),
    entity2: createFighterEntity(2, false),
    vfx: createVFXState(),
  });

  describe("processAction", () => {
    it("executes attack for attack action", () => {
      const entity = createFighterEntity(1, true);
      const result = processAction(entity, "attack");

      expect(result.context.state).toBe("attacking");
    });

    it("blocks for block action", () => {
      const entity = createFighterEntity(1, true);
      const result = processAction(entity, "block");

      expect(result.context.state).toBe("blocking");
    });
  });

  describe("tickGameLoop", () => {
    it("updates entities per tick", () => {
      const state = createState();
      const result = tickGameLoop(
        state,
        100,
        100,
        200,
        100,
        "advance",
        "advance",
      );

      expect(result.entity1.context.stateFrame).toBe(1);
      expect(result.entity2.context.stateFrame).toBe(1);
    });
  });
});
