import type { BTContext } from "@/game/ai/bt/types";
import type { FighterEntity } from "@/game/fighter/entity";

export const ARENA_WIDTH = 800;
export const ARENA_HEIGHT = 600;
export const FLOOR_Y = 550;
export const ROUND_TIME = 99;
export const FRAMES_PER_SECOND = 60;

export const FIGHTER1_START_X = 200;
export const FIGHTER2_START_X = 600;
export const FIGHTER_START_Y = 500;

export const FIGHTER1_COLOR = 0x3b82f6;
export const FIGHTER2_COLOR = 0xef4444;

export const createBTContext = (
  e: FighterEntity,
  enemy: FighterEntity,
  x: number,
  enemyX: number,
): BTContext => ({
  ownHealth: e.context.health,
  ownMaxHealth: 100,
  enemyHealth: enemy.context.health,
  enemyMaxHealth: 100,
  distanceToEnemy: Math.abs(x - enemyX),
  nearWall: x < 60 || x > ARENA_WIDTH - 60,
  projectileIncoming: false,
});

export const getTotalAttackFrames = (e: FighterEntity): number =>
  e.currentAttack
    ? e.currentAttack.startupFrames +
      e.currentAttack.activeFrames +
      e.currentAttack.recoveryFrames
    : 14;
