import Phaser from "phaser";
import { emitStateChange, updateGameState } from "@/game/store";

const ARENA_WIDTH = 800;
const ARENA_HEIGHT = 600;
const FLOOR_Y = 550;
const WALL_THICKNESS = 20;

export class FightScene extends Phaser.Scene {
  constructor() {
    super({ key: "FightScene" });
  }

  create(): void {
    this.createArena();
    this.initGameState();
  }

  private createArena(): void {
    const { matter } = this;

    // Floor
    matter.add.rectangle(
      ARENA_WIDTH / 2,
      FLOOR_Y,
      ARENA_WIDTH,
      WALL_THICKNESS,
      { isStatic: true, label: "floor" },
    );

    // Left wall
    matter.add.rectangle(
      WALL_THICKNESS / 2,
      ARENA_HEIGHT / 2,
      WALL_THICKNESS,
      ARENA_HEIGHT,
      { isStatic: true, label: "leftWall" },
    );

    // Right wall
    matter.add.rectangle(
      ARENA_WIDTH - WALL_THICKNESS / 2,
      ARENA_HEIGHT / 2,
      WALL_THICKNESS,
      ARENA_HEIGHT,
      { isStatic: true, label: "rightWall" },
    );
  }

  private initGameState(): void {
    updateGameState({
      player1Health: 100,
      player2Health: 100,
      timer: 99,
      gameStatus: "fighting",
    });
    emitStateChange();
  }

  update(): void {
    // Game loop updates here
  }
}
