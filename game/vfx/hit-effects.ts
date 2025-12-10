export type HitEffect = Readonly<{
  x: number;
  y: number;
  frame: number;
  maxFrames: number;
  type: "light" | "heavy" | "critical";
}>;

export type ScreenShake = Readonly<{
  intensity: number;
  duration: number;
  elapsed: number;
}>;

export type VFXState = Readonly<{
  hitEffects: readonly HitEffect[];
  screenShake: ScreenShake | null;
}>;

export const createVFXState = (): VFXState => ({
  hitEffects: [],
  screenShake: null,
});

export const spawnHitEffect = (
  state: VFXState,
  x: number,
  y: number,
  type: HitEffect["type"],
): VFXState => ({
  ...state,
  hitEffects: [
    ...state.hitEffects,
    { x, y, frame: 0, maxFrames: type === "critical" ? 20 : 12, type },
  ],
});

export const triggerScreenShake = (
  state: VFXState,
  intensity: number,
  duration: number,
): VFXState => ({
  ...state,
  screenShake: { intensity, duration, elapsed: 0 },
});

export const updateVFX = (state: VFXState): VFXState => ({
  hitEffects: state.hitEffects
    .map((e) => ({ ...e, frame: e.frame + 1 }))
    .filter((e) => e.frame < e.maxFrames),
  screenShake: state.screenShake
    ? state.screenShake.elapsed >= state.screenShake.duration
      ? null
      : { ...state.screenShake, elapsed: state.screenShake.elapsed + 1 }
    : null,
});

export const getShakeOffset = (
  shake: ScreenShake | null,
): { x: number; y: number } => {
  if (!shake) return { x: 0, y: 0 };
  const progress = shake.elapsed / shake.duration;
  const decay = 1 - progress;
  return {
    x: (Math.random() - 0.5) * shake.intensity * 2 * decay,
    y: (Math.random() - 0.5) * shake.intensity * 2 * decay,
  };
};
