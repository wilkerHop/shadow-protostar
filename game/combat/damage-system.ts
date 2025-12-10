import type { FighterContext } from "../fighter/state-machine";
import type { HitResult } from "./collision-system";

export type DamageEvent = Readonly<{
  damage: number;
  hitstun: number;
  knockbackX: number;
  knockbackY: number;
}>;

export const applyDamage = (
  ctx: FighterContext,
  hitResult: HitResult,
): FighterContext => {
  if (!hitResult.hit) return ctx;

  return {
    ...ctx,
    health: Math.max(0, ctx.health - hitResult.damage),
    hitstunRemaining: hitResult.hitstun,
    state: "hitstun",
    stateFrame: 0,
  };
};

export const applyBlockDamage = (
  ctx: FighterContext,
  hitResult: HitResult,
): FighterContext => {
  if (!hitResult.hit) return ctx;

  const chipDamage = Math.floor(hitResult.damage * 0.1);
  const blockstun = Math.floor(hitResult.hitstun * 0.6);

  return {
    ...ctx,
    health: Math.max(0, ctx.health - chipDamage),
    blockstunRemaining: blockstun,
  };
};

export const isKO = (ctx: FighterContext): boolean => ctx.health <= 0;
