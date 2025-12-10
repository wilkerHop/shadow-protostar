import type { BTAction, BTContext } from "./bt/types";
import { createTacticalNN, type NNOutput } from "./nn/model";

const ATTACK_RANGE = 120;

const nnToAction = (output: NNOutput): BTAction => {
  const actions: { action: BTAction; score: number }[] = [
    { action: "block", score: output.block },
    { action: "jump", score: output.jump },
    { action: "attack", score: output.attack },
    { action: "advance", score: output.move },
  ];
  return actions.reduce((prev, current) =>
    prev.score > current.score ? prev : current,
  ).action;
};

export const createAIController = (): ((ctx: BTContext) => BTAction) => {
  const tacticalNN = createTacticalNN();

  return (context: BTContext): BTAction => {
    if (context.ownHealth <= 0) return "block";

    const ownHealthPercent = context.ownHealth / context.ownMaxHealth;
    const enemyHealthPercent = context.enemyHealth / context.enemyMaxHealth;

    // Survival Strategy
    if (ownHealthPercent < 0.2 && context.ownHealth < context.enemyHealth) {
      return Math.random() > 0.4 ? "block" : "retreat";
    }

    // Neural Network Decision
    const nnOutput = tacticalNN.predict({
      distanceToEnemy: Math.min(context.distanceToEnemy, 800) / 800,
      enemyX: 0.5,
      enemyY: 0.5,
      ownHealthPercent,
      enemyHealthPercent,
      nearWall: context.nearWall ? 1 : 0,
      projectileIncoming: context.projectileIncoming ? 1 : 0,
    });

    const nnAction = nnToAction(nnOutput);

    // Override: Must attack if very close
    if (
      context.distanceToEnemy < ATTACK_RANGE &&
      nnAction !== "attack" &&
      nnAction !== "block"
    ) {
      return Math.random() > 0.3 ? "attack" : "block";
    }

    return nnAction;
  };
};
