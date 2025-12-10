export type ComboState = Readonly<{
  hitCount: number;
  totalDamage: number;
  lastHitFrame: number;
  isActive: boolean;
}>;

const COMBO_TIMEOUT_FRAMES = 60; // 1 second at 60fps

export const createComboState = (): ComboState => ({
  hitCount: 0,
  totalDamage: 0,
  lastHitFrame: 0,
  isActive: false,
});

export const registerHit = (
  state: ComboState,
  damage: number,
  currentFrame: number,
): ComboState => ({
  hitCount: state.hitCount + 1,
  totalDamage: state.totalDamage + damage,
  lastHitFrame: currentFrame,
  isActive: true,
});

export const updateCombo = (
  state: ComboState,
  currentFrame: number,
): ComboState => {
  if (!state.isActive) return state;

  const framesSinceHit = currentFrame - state.lastHitFrame;

  if (framesSinceHit > COMBO_TIMEOUT_FRAMES) {
    return createComboState();
  }

  return state;
};

export const getComboMultiplier = (hitCount: number): number => {
  if (hitCount < 3) return 1;
  if (hitCount < 5) return 1.1;
  if (hitCount < 8) return 1.2;
  return 1.5;
};
