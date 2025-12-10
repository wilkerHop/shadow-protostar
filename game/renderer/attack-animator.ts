import type { FighterState } from "../fighter/state-machine";

export type LimbOffsets = Readonly<{
  armX: number;
  armY: number;
  armRotation: number;
}>;

export const getAttackLimbOffsets = (
  attackFrame: number,
  totalFrames: number,
  facingRight: boolean,
): LimbOffsets => {
  const progress = attackFrame / Math.max(totalFrames, 1);
  const direction = facingRight ? 1 : -1;

  if (progress < 0.3) {
    return { armX: -10 * direction, armY: 5, armRotation: -0.3 * direction };
  }
  if (progress < 0.6) {
    return { armX: 40 * direction, armY: -5, armRotation: 0.5 * direction };
  }
  return { armX: 15 * direction, armY: 0, armRotation: 0.1 * direction };
};

export const getIdleLimbOffsets = (
  frame: number,
  facingRight: boolean,
): LimbOffsets => {
  const breathe = Math.sin(frame * 0.05) * 2;
  const direction = facingRight ? 1 : -1;
  return { armX: 15 * direction, armY: breathe, armRotation: 0.2 * direction };
};

export const getHitstunOffsets = (
  frame: number,
  facingRight: boolean,
): LimbOffsets => {
  const shake = Math.sin(frame * 0.5) * 3;
  const direction = facingRight ? 1 : -1;
  return {
    armX: -5 * direction + shake,
    armY: 10,
    armRotation: -0.5 * direction,
  };
};

export const getLimbOffsets = (
  state: FighterState,
  frame: number,
  attackFrame: number,
  totalAttackFrames: number,
  facingRight: boolean,
): LimbOffsets => {
  if (state === "attacking") {
    return getAttackLimbOffsets(attackFrame, totalAttackFrames, facingRight);
  }
  if (state === "hitstun") {
    return getHitstunOffsets(frame, facingRight);
  }
  return getIdleLimbOffsets(frame, facingRight);
};
