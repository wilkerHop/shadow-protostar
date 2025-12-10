export type FighterState =
  | "idle"
  | "walking"
  | "jumping"
  | "crouching"
  | "attacking"
  | "blocking"
  | "hitstun"
  | "knockdown";

export type FighterContext = Readonly<{
  state: FighterState;
  stateFrame: number;
  facingRight: boolean;
  isGrounded: boolean;
  health: number;
  hitstunRemaining: number;
  blockstunRemaining: number;
}>;

export const createFighterContext = (facingRight: boolean): FighterContext => ({
  state: "idle",
  stateFrame: 0,
  facingRight,
  isGrounded: true,
  health: 100,
  hitstunRemaining: 0,
  blockstunRemaining: 0,
});

export const canTransition = (
  from: FighterState,
  to: FighterState,
  ctx: FighterContext,
): boolean => {
  // Can't act during hitstun or knockdown
  if (from === "hitstun" && ctx.hitstunRemaining > 0) return to === "hitstun";
  if (from === "knockdown") return to === "idle" && ctx.stateFrame > 30;

  // State-specific rules
  if (from === "attacking") return false; // Must complete attack
  if (to === "jumping" && !ctx.isGrounded) return false;

  return true;
};

export const transitionTo = (
  ctx: FighterContext,
  newState: FighterState,
): FighterContext => {
  if (!canTransition(ctx.state, newState, ctx)) return ctx;

  return {
    ...ctx,
    state: newState,
    stateFrame: 0,
  };
};

export const tickState = (ctx: FighterContext): FighterContext => {
  const newHitstun = Math.max(0, ctx.hitstunRemaining - 1);
  const newBlockstun = Math.max(0, ctx.blockstunRemaining - 1);

  // Auto-transition out of hitstun
  if (ctx.state === "hitstun" && newHitstun === 0) {
    return { ...ctx, state: "idle", stateFrame: 0, hitstunRemaining: 0 };
  }

  // Auto-transition out of blockstun
  if (ctx.state === "blocking" && newBlockstun === 0) {
    return { ...ctx, state: "idle", stateFrame: 0, blockstunRemaining: 0 };
  }

  return {
    ...ctx,
    stateFrame: ctx.stateFrame + 1,
    hitstunRemaining: newHitstun,
    blockstunRemaining: newBlockstun,
  };
};
