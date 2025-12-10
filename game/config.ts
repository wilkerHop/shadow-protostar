import Phaser from "phaser";

export type GameConfig = Phaser.Types.Core.GameConfig;

export const createGameConfig = (
  parent: HTMLElement,
  scenes: Phaser.Types.Scenes.SceneType[],
): GameConfig => ({
  type: Phaser.AUTO,
  parent,
  width: 800,
  height: 600,
  backgroundColor: "#1a1a2e",
  physics: {
    default: "matter",
    matter: {
      gravity: { x: 0, y: 1 },
      debug: process.env.NODE_ENV === "development",
    },
  },
  scene: scenes,
});
