import type { FighterState } from "../fighter/state-machine";

export type AnimationFrame = Readonly<{
  x: number;
  y: number;
  width: number;
  height: number;
}>;

export type Animation = Readonly<{
  frames: readonly AnimationFrame[];
  fps: number;
  loop: boolean;
}>;

export type SpriteConfig = Readonly<{
  idle: Animation;
  walking: Animation;
  jumping: Animation;
  crouching: Animation;
  attacking: Animation;
  blocking: Animation;
  hitstun: Animation;
  knockdown: Animation;
}>;

const createSingleFrame = (y: number): Animation => ({
  frames: [{ x: 0, y, width: 64, height: 64 }],
  fps: 1,
  loop: true,
});

const createMultiFrame = (
  y: number,
  count: number,
  fps: number,
  loop: boolean,
): Animation => ({
  frames: Array.from({ length: count }, (_, i) => ({
    x: i * 64,
    y,
    width: 64,
    height: 64,
  })),
  fps,
  loop,
});

export const DEFAULT_SPRITE_CONFIG: SpriteConfig = {
  idle: createMultiFrame(0, 4, 8, true),
  walking: createMultiFrame(64, 6, 12, true),
  jumping: createMultiFrame(128, 3, 8, false),
  crouching: createSingleFrame(192),
  attacking: createMultiFrame(256, 4, 15, false),
  blocking: createSingleFrame(320),
  hitstun: createMultiFrame(384, 2, 10, true),
  knockdown: createMultiFrame(448, 3, 8, false),
};

export const getAnimationForState = (
  config: SpriteConfig,
  state: FighterState,
): Animation => config[state];

export const getFrameIndex = (
  animation: Animation,
  stateFrame: number,
): number => {
  const frameCount = animation.frames.length;
  const animFrame = Math.floor(stateFrame / (60 / animation.fps));

  if (animation.loop) {
    return animFrame % frameCount;
  }
  return Math.min(animFrame, frameCount - 1);
};

export const getCurrentFrame = (
  config: SpriteConfig,
  state: FighterState,
  stateFrame: number,
): AnimationFrame => {
  const animation = getAnimationForState(config, state);
  const frameIndex = getFrameIndex(animation, stateFrame);
  return (
    animation.frames[frameIndex] ??
    animation.frames[0] ?? { x: 0, y: 0, width: 64, height: 64 }
  );
};
