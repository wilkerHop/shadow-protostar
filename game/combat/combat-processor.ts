import type { FighterEntity } from "../fighter/entity";
import { applyHit, clearAttack, startAttack } from "../fighter/entity";
import {
  getActiveHitbox,
  HEAVY_PUNCH,
  isAttackComplete,
  LIGHT_PUNCH,
} from "./attack-data";
import {
  type Fighter as CollisionFighter,
  checkCollision,
} from "./collision-system";

export type CombatResult = Readonly<{
  entity1: FighterEntity;
  entity2: FighterEntity;
  hits: readonly { target: 1 | 2; damage: number; x: number; y: number }[];
}>;

const toCollisionFighter = (
  entity: FighterEntity,
  x: number,
  y: number,
): CollisionFighter => ({
  x,
  y,
  facingRight: entity.context.facingRight,
  activeHitbox: entity.currentAttack
    ? getActiveHitbox(entity.currentAttack, entity.attackFrame)
    : null,
  hurtbox: entity.hurtbox,
});

export const processCombat = (
  e1: FighterEntity,
  e2: FighterEntity,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): CombatResult => {
  const hits: { target: 1 | 2; damage: number; x: number; y: number }[] = [];

  const c1 = toCollisionFighter(e1, x1, y1);
  const c2 = toCollisionFighter(e2, x2, y2);

  const hit1on2 = checkCollision(c1, c2);
  const hit2on1 = checkCollision(c2, c1);

  let newE1 = completeAttackIfDone(e1);
  let newE2 = completeAttackIfDone(e2);

  if (hit1on2.hit && e2.context.state !== "hitstun") {
    newE2 = applyHit(newE2, hit1on2.damage, hit1on2.hitstun);
    hits.push({ target: 2, damage: hit1on2.damage, x: x2, y: y2 });
  }

  if (hit2on1.hit && e1.context.state !== "hitstun") {
    newE1 = applyHit(newE1, hit2on1.damage, hit2on1.hitstun);
    hits.push({ target: 1, damage: hit2on1.damage, x: x1, y: y1 });
  }

  return { entity1: newE1, entity2: newE2, hits };
};

const completeAttackIfDone = (entity: FighterEntity): FighterEntity => {
  if (!entity.currentAttack) return entity;
  if (isAttackComplete(entity.currentAttack, entity.attackFrame)) {
    return clearAttack(entity);
  }
  return entity;
};

export const executeAttack = (entity: FighterEntity): FighterEntity => {
  if (
    entity.context.state === "attacking" ||
    entity.context.state === "hitstun"
  ) {
    return entity;
  }
  const attack = Math.random() > 0.5 ? HEAVY_PUNCH : LIGHT_PUNCH;
  return startAttack(entity, attack);
};
