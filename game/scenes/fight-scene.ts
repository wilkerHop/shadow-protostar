import Phaser from "phaser";
import type { BTContext } from "@/game/ai/bt/types";
import { createAIController } from "@/game/ai/controller";
import { emitStateChange, updateGameState } from "@/game/store";
import { applyAction } from "./actions";

const ARENA_WIDTH = 800;
const ARENA_HEIGHT = 600;
const FLOOR_Y = 550;

type Fighter = {
  body: MatterJS.BodyType;
  health: number;
  x: number;
  graphics: Phaser.GameObjects.Rectangle;
};

const createContext = (self: Fighter, enemy: Fighter): BTContext => ({
  ownHealth: self.health,
  ownMaxHealth: 100,
  enemyHealth: enemy.health,
  enemyMaxHealth: 100,
  distanceToEnemy: Math.abs(self.x - enemy.x),
  nearWall: self.x < 60 || self.x > ARENA_WIDTH - 60,
  projectileIncoming: false,
});

export class FightScene extends Phaser.Scene {
  private fighter1: Fighter | null = null;
  private fighter2: Fighter | null = null;
  private ai1 = createAIController();
  private ai2 = createAIController();

  constructor() {
    super({ key: "FightScene" });
  }

  create(): void {
    this.createArena();
    this.createFighters();
    this.initGameState();
  }

  private createArena(): void {
    this.matter.add.rectangle(ARENA_WIDTH / 2, FLOOR_Y, ARENA_WIDTH, 20, {
      isStatic: true,
    });
    this.matter.add.rectangle(10, ARENA_HEIGHT / 2, 20, ARENA_HEIGHT, {
      isStatic: true,
    });
    this.matter.add.rectangle(
      ARENA_WIDTH - 10,
      ARENA_HEIGHT / 2,
      20,
      ARENA_HEIGHT,
      {
        isStatic: true,
      },
    );
  }

  private createFighters(): void {
    const g1 = this.add.rectangle(200, 500, 40, 60, 0x3b82f6);
    const b1 = this.matter.add.rectangle(200, 500, 40, 60, { friction: 0.1 });
    const g2 = this.add.rectangle(600, 500, 40, 60, 0xef4444);
    const b2 = this.matter.add.rectangle(600, 500, 40, 60, { friction: 0.1 });

    this.fighter1 = { body: b1, health: 100, x: 200, graphics: g1 };
    this.fighter2 = { body: b2, health: 100, x: 600, graphics: g2 };
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
    if (!this.fighter1 || !this.fighter2) return;

    this.syncPositions();
    this.processAI();
    this.syncState();
  }

  private syncPositions(): void {
    if (!this.fighter1 || !this.fighter2) return;
    this.fighter1.x = this.fighter1.body.position.x;
    this.fighter2.x = this.fighter2.body.position.x;
    this.fighter1.graphics.setPosition(
      this.fighter1.x,
      this.fighter1.body.position.y,
    );
    this.fighter2.graphics.setPosition(
      this.fighter2.x,
      this.fighter2.body.position.y,
    );
  }

  private processAI(): void {
    if (!this.fighter1 || !this.fighter2) return;

    const action1 = this.ai1(createContext(this.fighter1, this.fighter2));
    const action2 = this.ai2(createContext(this.fighter2, this.fighter1));

    applyAction(
      action1,
      { body: this.fighter1.body, facingRight: true },
      this.matter,
    );
    applyAction(
      action2,
      { body: this.fighter2.body, facingRight: false },
      this.matter,
    );
  }

  private syncState(): void {
    if (!this.fighter1 || !this.fighter2) return;
    updateGameState({
      player1Health: this.fighter1.health,
      player2Health: this.fighter2.health,
    });
    emitStateChange();
  }
}
