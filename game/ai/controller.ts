import type { BTAction, BTContext } from "./bt/types";
import { createTacticalNN, type NNOutput } from "./nn/model";

const CRITICAL_HEALTH_THRESHOLD = 0.25;
const FINISH_THRESHOLD = 0.2;

const nnToAction = (output: NNOutput): BTAction => {
  const actions: readonly [BTAction, number][] = [
    ["block", output.block],
    ["jump", output.jump],
    ["attack", output.attack],
    ["advance", output.move],
  ];

  return actions.reduce<[BTAction, number]>(
    (best, current) => (current[1] > best[1] ? current : best),
    ["block", 0],
  )[0];
};

export const createAIController = (): ((ctx: BTContext) => BTAction) => {
  const tacticalNN = createTacticalNN();

  return (context: BTContext): BTAction => {
    const ownHealthPercent = context.ownHealth / context.ownMaxHealth;
    const enemyHealthPercent = context.enemyHealth / context.enemyMaxHealth;

    // Priority 0: Survival Mode (Override NN)
    if (
      ownHealthPercent < CRITICAL_HEALTH_THRESHOLD ||
      context.projectileIncoming
    ) {
      return "block";
    }

    // Priority 1: Eliminate Mode
    if (
      enemyHealthPercent < FINISH_THRESHOLD &&
      context.distanceToEnemy > 100
    ) {
      return "attack";
    }

    // Priority 2: Neural Network Tactics
    const nnOutput = tacticalNN.predict({
      distanceToEnemy: context.distanceToEnemy / 800,
      enemyX: 0.5,
      enemyY: 0.5,
      ownHealthPercent,
      enemyHealthPercent,
      nearWall: context.nearWall ? 1 : 0,
      projectileIncoming: context.projectileIncoming ? 1 : 0,
    });

    return nnToAction(nnOutput);
  };
};
