import type { BTAction, BTContext } from "./bt/types";

const ATTACK_RANGE = 80;
const APPROACH_RANGE = 200;

export const createAIController = (): ((ctx: BTContext) => BTAction) => {
  return (context: BTContext): BTAction => {
    const ownHealthPercent = context.ownHealth / context.ownMaxHealth;

    // Priority 0: Survival - block when low health
    if (ownHealthPercent < 0.2) {
      return Math.random() > 0.3 ? "block" : "retreat";
    }

    // Priority 1: Attack when in range
    if (context.distanceToEnemy < ATTACK_RANGE) {
      return Math.random() > 0.2 ? "attack" : "block";
    }

    // Priority 2: Advance when far
    if (context.distanceToEnemy > APPROACH_RANGE) {
      return "advance";
    }

    // Priority 3: Mid-range tactics
    const roll = Math.random();
    if (roll < 0.4) return "advance";
    if (roll < 0.6) return "attack";
    if (roll < 0.8) return "jump";
    return "block";
  };
};
