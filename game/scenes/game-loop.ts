import type { BTAction } from "../ai/bt/types";
import { executeAttack, processCombat } from "../combat/combat-processor";
import type { FighterEntity } from "../fighter/entity";
import { transitionEntityTo, updateEntityState } from "../fighter/entity";
import type { VFXState } from "../vfx/hit-effects";
import {
  spawnHitEffect,
  triggerScreenShake,
  updateVFX,
} from "../vfx/hit-effects";

export type GameLoopState = Readonly<{
  entity1: FighterEntity;
  entity2: FighterEntity;
  vfx: VFXState;
}>;

export const processAction = (
  entity: FighterEntity,
  action: BTAction,
): FighterEntity => {
  if (entity.context.state === "hitstun") return entity;

  switch (action) {
    case "attack":
      return executeAttack(entity);
    case "block":
      return transitionEntityTo(entity, "blocking");
    case "jump":
      return transitionEntityTo(entity, "jumping");
    default:
      return entity;
  }
};

export const tickGameLoop = (
  state: GameLoopState,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  action1: BTAction,
  action2: BTAction,
): GameLoopState => {
  // Process AI actions
  const e1AfterAction = processAction(state.entity1, action1);
  const e2AfterAction = processAction(state.entity2, action2);

  // Tick state machines
  const e1Ticked = updateEntityState(e1AfterAction);
  const e2Ticked = updateEntityState(e2AfterAction);

  // Process combat
  const combatResult = processCombat(e1Ticked, e2Ticked, x1, y1, x2, y2);

  // Spawn VFX for hits
  const vfxWithHits = combatResult.hits.reduce(
    (vfx, hit) =>
      spawnHitEffect(vfx, hit.x, hit.y, hit.damage > 10 ? "heavy" : "light"),
    state.vfx,
  );

  const vfxWithShake =
    combatResult.hits.length > 0
      ? triggerScreenShake(vfxWithHits, 5, 10)
      : vfxWithHits;

  return {
    entity1: combatResult.entity1,
    entity2: combatResult.entity2,
    vfx: updateVFX(vfxWithShake),
  };
};
