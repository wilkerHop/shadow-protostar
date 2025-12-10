import type { AttackData } from "../combat/attack-data";
import type { Hurtbox } from "../combat/hitbox";
import { createHurtbox } from "../combat/hitbox";
import type { FighterContext, FighterState } from "./state-machine";
import { createFighterContext, tickState, transitionTo } from "./state-machine";

export type FighterEntity = Readonly<{
  id: 1 | 2;
  context: FighterContext;
  currentAttack: AttackData | null;
  attackFrame: number;
  hurtbox: Hurtbox;
}>;

export const createFighterEntity = (
  id: 1 | 2,
  facingRight: boolean,
): FighterEntity => ({
  id,
  context: createFighterContext(facingRight),
  currentAttack: null,
  attackFrame: 0,
  hurtbox: createHurtbox(-25, -35, 50, 70),
});

export const updateEntityState = (entity: FighterEntity): FighterEntity => ({
  ...entity,
  context: tickState(entity.context),
  attackFrame: entity.currentAttack ? entity.attackFrame + 1 : 0,
});

export const transitionEntityTo = (
  entity: FighterEntity,
  state: FighterState,
): FighterEntity => ({
  ...entity,
  context: transitionTo(entity.context, state),
});

export const startAttack = (
  entity: FighterEntity,
  attack: AttackData,
): FighterEntity => ({
  ...entity,
  context: transitionTo(entity.context, "attacking"),
  currentAttack: attack,
  attackFrame: 0,
});

export const clearAttack = (entity: FighterEntity): FighterEntity => ({
  ...entity,
  context: transitionTo(entity.context, "idle"),
  currentAttack: null,
  attackFrame: 0,
});

export const applyHit = (
  entity: FighterEntity,
  damage: number,
  hitstun: number,
): FighterEntity => ({
  ...entity,
  context: {
    ...entity.context,
    health: Math.max(0, entity.context.health - damage),
    hitstunRemaining: hitstun,
    state: "hitstun",
    stateFrame: 0,
  },
  currentAttack: null,
  attackFrame: 0,
});
