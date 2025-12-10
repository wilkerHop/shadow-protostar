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
  activeFrames: 3,
  recoveryFrames: 8,
  hitbox: createHitbox(30, -20, 40, 30, 5, 10, 2, 0),
};

export const HEAVY_PUNCH: AttackData = {
  name: "Heavy Punch",
  startupFrames: 7,
  activeFrames: 4,
  recoveryFrames: 15,
  hitbox: createHitbox(25, -25, 50, 40, 12, 18, 5, -2),
};

export const LIGHT_KICK: AttackData = {
  name: "Light Kick",
  startupFrames: 4,
  activeFrames: 3,
  recoveryFrames: 10,
  hitbox: createHitbox(20, 0, 60, 25, 6, 12, 3, 0),
};

export const HEAVY_KICK: AttackData = {
  name: "Heavy Kick",
  startupFrames: 10,
  activeFrames: 5,
  recoveryFrames: 20,
  hitbox: createHitbox(15, -10, 70, 50, 15, 22, 7, -3),
};
