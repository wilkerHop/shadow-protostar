import type { Hitbox, Hurtbox } from "./hitbox";
import { boxesOverlap, offsetBox } from "./hitbox";

export type Fighter = Readonly<{
  x: number;
  y: number;
  facingRight: boolean;
  activeHitbox: Hitbox | null;
  hurtbox: Hurtbox;
}>;

export type HitResult = Readonly<{
  hit: boolean;
  damage: number;
  hitstun: number;
  knockbackX: number;
  knockbackY: number;
}>;

const NO_HIT: HitResult = {
  hit: false,
  damage: 0,
  hitstun: 0,
  knockbackX: 0,
  knockbackY: 0,
};

export const checkCollision = (
  attacker: Fighter,
  defender: Fighter,
): HitResult => {
  if (!attacker.activeHitbox) return NO_HIT;

  const hitbox = offsetBox(attacker.activeHitbox, attacker.x, attacker.y);
  const hurtbox = offsetBox(defender.hurtbox, defender.x, defender.y);

  if (!boxesOverlap(hitbox, hurtbox)) return NO_HIT;

  const direction = attacker.facingRight ? 1 : -1;

  return {
    hit: true,
    damage: attacker.activeHitbox.damage,
    hitstun: attacker.activeHitbox.hitstun,
    knockbackX: attacker.activeHitbox.knockbackX * direction,
    knockbackY: attacker.activeHitbox.knockbackY,
  };
};
