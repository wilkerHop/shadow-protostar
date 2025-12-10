import type Phaser from "phaser";
import {
  createFighterParts,
  type FighterParts,
} from "@/game/renderer/fighter-renderer";
import {
  ARENA_HEIGHT,
  ARENA_WIDTH,
  FIGHTER_START_Y,
  FIGHTER1_COLOR,
  FIGHTER1_START_X,
  FIGHTER2_COLOR,
  FIGHTER2_START_X,
  FLOOR_Y,
} from "./scene-config";

export type SceneFighter = { body: MatterJS.BodyType; parts: FighterParts };

export const createArena = (
  matter: Phaser.Physics.Matter.MatterPhysics,
): void => {
  matter.world.setBounds(0, 0, ARENA_WIDTH, ARENA_HEIGHT);
  matter.add.rectangle(ARENA_WIDTH / 2, FLOOR_Y, ARENA_WIDTH, 20, {
    isStatic: true,
  });
  matter.add.rectangle(10, ARENA_HEIGHT / 2, 20, ARENA_HEIGHT, {
    isStatic: true,
  });
  matter.add.rectangle(ARENA_WIDTH - 10, ARENA_HEIGHT / 2, 20, ARENA_HEIGHT, {
    isStatic: true,
  });
};

export const createSceneFighter = (
  scene: Phaser.Scene,
  matter: Phaser.Physics.Matter.MatterPhysics,
  x: number,
  y: number,
  color: number,
): SceneFighter => ({
  body: matter.add.rectangle(x, y, 40, 60, { friction: 0.1 }),
  parts: createFighterParts(scene, x, y, color),
});

export const createFighter1 = (
  scene: Phaser.Scene,
  matter: Phaser.Physics.Matter.MatterPhysics,
): SceneFighter =>
  createSceneFighter(
    scene,
    matter,
    FIGHTER1_START_X,
    FIGHTER_START_Y,
    FIGHTER1_COLOR,
  );

export const createFighter2 = (
  scene: Phaser.Scene,
  matter: Phaser.Physics.Matter.MatterPhysics,
): SceneFighter =>
  createSceneFighter(
    scene,
    matter,
    FIGHTER2_START_X,
    FIGHTER_START_Y,
    FIGHTER2_COLOR,
  );
