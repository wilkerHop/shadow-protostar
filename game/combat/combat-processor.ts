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
  const baseE1 = completeAttackIfDone(e1);
  const baseE2 = completeAttackIfDone(e2);

  const finalE2 = processHit(hit1on2, e2, baseE2, 2, x2, y2, hits);
  const finalE1 = processHit(hit2on1, e1, baseE1, 1, x1, y1, hits);

  return { entity1: finalE1, entity2: finalE2, hits };
};

type HitResult = { hit: boolean; damage: number; hitstun: number };
type HitLog = { target: 1 | 2; damage: number; x: number; y: number };

const processHit = (
  hitResult: HitResult,
  original: FighterEntity,
  base: FighterEntity,
  target: 1 | 2,
  x: number,
  y: number,
  hits: HitLog[],
): FighterEntity => {
  if (hitResult.hit && original.context.state !== "hitstun") {
    hits.push({ target, damage: hitResult.damage, x, y });
    return applyHit(base, hitResult.damage, hitResult.hitstun);
  }
  return base;
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
