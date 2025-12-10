import type { Hitbox } from "./hitbox";
import { createHitbox } from "./hitbox";

export type AttackPhase = "startup" | "active" | "recovery";

export type AttackData = Readonly<{
  name: string;
  startupFrames: number;
  activeFrames: number;
  recoveryFrames: number;
  hitbox: Hitbox;
}>;

export const getAttackPhase = (
  attack: AttackData,
  frame: number,
): AttackPhase => {
  if (frame < attack.startupFrames) return "startup";
  if (frame < attack.startupFrames + attack.activeFrames) return "active";
  return "recovery";
};

export const isAttackComplete = (attack: AttackData, frame: number): boolean =>
  frame >= attack.startupFrames + attack.activeFrames + attack.recoveryFrames;

export const getActiveHitbox = (
  attack: AttackData,
  frame: number,
): Hitbox | null => {
  const phase = getAttackPhase(attack, frame);
  return phase === "active" ? attack.hitbox : null;
};

export const LIGHT_PUNCH: AttackData = {
  name: "Light Punch",
  startupFrames: 3,
  activeFrames: 5,
  recoveryFrames: 6,
  hitbox: createHitbox(20, -15, 80, 50, 8, 12, 3, 0),
};

export const HEAVY_PUNCH: AttackData = {
  name: "Heavy Punch",
  startupFrames: 5,
  activeFrames: 6,
  recoveryFrames: 12,
  hitbox: createHitbox(15, -20, 100, 60, 15, 20, 6, -2),
};

export const LIGHT_KICK: AttackData = {
  name: "Light Kick",
  startupFrames: 4,
  activeFrames: 5,
  recoveryFrames: 8,
  hitbox: createHitbox(10, 5, 90, 40, 10, 14, 4, 0),
};

export const HEAVY_KICK: AttackData = {
  name: "Heavy Kick",
  startupFrames: 8,
  activeFrames: 7,
  recoveryFrames: 16,
  hitbox: createHitbox(5, 0, 110, 70, 20, 25, 8, -3),
};
