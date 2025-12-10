import type Phaser from "phaser";
import type { HitEffect, ScreenShake } from "./hit-effects";
import { getShakeOffset } from "./hit-effects";

export const renderHitEffect = (
  scene: Phaser.Scene,
  effect: HitEffect,
): Phaser.GameObjects.Arc => {
  const colors = { light: 0xffff00, heavy: 0xff8800, critical: 0xff0000 };
  const size =
    effect.type === "critical" ? 30 : effect.type === "heavy" ? 20 : 15;
  const alpha = 1 - effect.frame / effect.maxFrames;

  const circle = scene.add.circle(
    effect.x,
    effect.y,
    size * alpha,
    colors[effect.type],
  );
  circle.setAlpha(alpha);

  return circle;
};

export const applyScreenShake = (
  camera: Phaser.Cameras.Scene2D.Camera,
  shake: ScreenShake | null,
): void => {
  if (!shake) return;

  const offset = getShakeOffset(shake);
  camera.setScroll(offset.x, offset.y);
};

export const clearScreenShake = (
  camera: Phaser.Cameras.Scene2D.Camera,
): void => {
  camera.setScroll(0, 0);
};

export const getStateColor = (state: string, baseColor: number): number => {
  const stateColors: Record<string, number> = {
    idle: baseColor,
    attacking: 0xffffff,
    hitstun: 0xff0000,
    blocking: 0x00ff00,
  };
  return stateColors[state] ?? baseColor;
};
