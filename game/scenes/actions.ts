import type { BTAction } from "@/game/ai/bt/types";

const MOVE_FORCE = 0.002;
const JUMP_FORCE = 0.015;

export type ActionTarget = {
  body: MatterJS.BodyType;
  facingRight: boolean;
};

export const applyAction = (
  action: BTAction,
  target: ActionTarget,
  matter: Phaser.Physics.Matter.MatterPhysics,
): void => {
  const { body, facingRight } = target;

  switch (action) {
    case "advance":
      matter.body.applyForce(body, body.position, {
        x: facingRight ? MOVE_FORCE : -MOVE_FORCE,
        y: 0,
      });
      break;
    case "retreat":
      matter.body.applyForce(body, body.position, {
        x: facingRight ? -MOVE_FORCE : MOVE_FORCE,
        y: 0,
      });
      break;
    case "jump":
      if (Math.abs(body.velocity.y) < 0.5) {
        matter.body.applyForce(body, body.position, { x: 0, y: -JUMP_FORCE });
      }
      break;
    case "block":
    case "attack":
      // Visual feedback only for now
      break;
  }
};
