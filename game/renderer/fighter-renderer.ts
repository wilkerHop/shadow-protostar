import type Phaser from "phaser";
import type { FighterState } from "../fighter/state-machine";
import { getLimbOffsets } from "./attack-animator";

export type FighterParts = Readonly<{
  body: Phaser.GameObjects.Rectangle;
  head: Phaser.GameObjects.Ellipse;
  armFront: Phaser.GameObjects.Rectangle;
  legLeft: Phaser.GameObjects.Rectangle;
  legRight: Phaser.GameObjects.Rectangle;
}>;

export const createFighterParts = (
  scene: Phaser.Scene,
  x: number,
  y: number,
  color: number,
): FighterParts => ({
  body: scene.add.rectangle(x, y, 30, 45, color),
  head: scene.add.ellipse(x, y - 35, 22, 25, color),
  armFront: scene.add.rectangle(x + 20, y - 10, 25, 10, color - 0x222222),
  legLeft: scene.add.rectangle(x - 8, y + 30, 10, 25, color - 0x111111),
  legRight: scene.add.rectangle(x + 8, y + 30, 10, 25, color - 0x111111),
});

export const updateFighterParts = (
  parts: FighterParts,
  x: number,
  y: number,
  state: FighterState,
  frame: number,
  attackFrame: number,
  totalAttackFrames: number,
  facingRight: boolean,
  baseColor: number,
): void => {
  const offsets = getLimbOffsets(
    state,
    frame,
    attackFrame,
    totalAttackFrames,
    facingRight,
  );
  const stateColor = getStateColorForParts(state, baseColor);

  parts.body.setPosition(x, y);
  parts.body.setFillStyle(stateColor);

  parts.head.setPosition(x, y - 35);
  parts.head.setFillStyle(stateColor);

  parts.armFront.setPosition(x + offsets.armX, y - 10 + offsets.armY);
  parts.armFront.setRotation(offsets.armRotation);
  parts.armFront.setFillStyle(stateColor - 0x222222);

  const legOffset = state === "jumping" ? -15 : 0;
  parts.legLeft.setPosition(x - 8, y + 30 + legOffset);
  parts.legRight.setPosition(x + 8, y + 30 + legOffset);
};

const getStateColorForParts = (
  state: FighterState,
  baseColor: number,
): number => {
  if (state === "attacking") return 0xffffff;
  if (state === "hitstun") return 0xff4444;
  if (state === "blocking") return 0x44ff44;
  return baseColor;
};

export const destroyFighterParts = (parts: FighterParts): void => {
  parts.body.destroy();
  parts.head.destroy();
  parts.armFront.destroy();
  parts.legLeft.destroy();
  parts.legRight.destroy();
};
