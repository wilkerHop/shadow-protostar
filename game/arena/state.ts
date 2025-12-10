export type ArenaState = Readonly<{
  leftWallX: number;
  rightWallX: number;
  shrinkSpeed: number;
  minWidth: number;
  staleTimer: number;
  lastDamageTime: number;
}>;

const INITIAL_LEFT = 20;
const INITIAL_RIGHT = 780;
const MIN_WIDTH = 200;
const SHRINK_SPEED = 0.5;
const STALE_THRESHOLD = 5000; // 5 seconds

export const createArenaState = (): ArenaState => ({
  leftWallX: INITIAL_LEFT,
  rightWallX: INITIAL_RIGHT,
  shrinkSpeed: SHRINK_SPEED,
  minWidth: MIN_WIDTH,
  staleTimer: 0,
  lastDamageTime: Date.now(),
});

export const updateArena = (
  state: ArenaState,
  currentTime: number,
  damageOccurred: boolean,
): ArenaState => {
  const newLastDamageTime = damageOccurred ? currentTime : state.lastDamageTime;
  const timeSinceDamage = currentTime - newLastDamageTime;

  // Check if fight is stale
  if (timeSinceDamage < STALE_THRESHOLD) {
    return { ...state, lastDamageTime: newLastDamageTime, staleTimer: 0 };
  }

  // Arena is shrinking due to stale fight
  const currentWidth = state.rightWallX - state.leftWallX;
  if (currentWidth <= state.minWidth) {
    return { ...state, staleTimer: timeSinceDamage };
  }

  return {
    ...state,
    leftWallX: state.leftWallX + state.shrinkSpeed,
    rightWallX: state.rightWallX - state.shrinkSpeed,
    staleTimer: timeSinceDamage,
    lastDamageTime: newLastDamageTime,
  };
};

export const getArenaWidth = (state: ArenaState): number =>
  state.rightWallX - state.leftWallX;

export const isArenaShrinking = (state: ArenaState): boolean =>
  state.staleTimer >= STALE_THRESHOLD;
