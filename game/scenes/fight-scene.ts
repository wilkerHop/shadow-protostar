import Phaser from "phaser";
import type { BTContext } from "@/game/ai/bt/types";
import { createAIController } from "@/game/ai/controller";
import { createFighterEntity, type FighterEntity } from "@/game/fighter/entity";
import { emitStateChange, updateGameState } from "@/game/store";
import { createVFXState } from "@/game/vfx/hit-effects";
import {
  applyScreenShake,
  getStateColor,
  renderHitEffect,
} from "@/game/vfx/vfx-renderer";
import { applyAction } from "./actions";
import { type GameLoopState, tickGameLoop } from "./game-loop";

const ARENA_WIDTH = 800;
const ARENA_HEIGHT = 600;
const FLOOR_Y = 550;
const ROUND_TIME = 99;
const FRAMES_PER_SECOND = 60;

type SceneFighter = {
  body: MatterJS.BodyType;
  graphics: Phaser.GameObjects.Rectangle;
};

const createContext = (
  e: FighterEntity,
  enemy: FighterEntity,
  x: number,
): BTContext => ({
  ownHealth: e.context.health,
  ownMaxHealth: 100,
  enemyHealth: enemy.context.health,
  enemyMaxHealth: 100,
  distanceToEnemy: 100,
  nearWall: x < 60 || x > ARENA_WIDTH - 60,
  projectileIncoming: false,
});

export class FightScene extends Phaser.Scene {
  private f1: SceneFighter | null = null;
  private f2: SceneFighter | null = null;
  private gameState: GameLoopState | null = null;
  private ai1 = createAIController();
  private ai2 = createAIController();
  private effectSprites: Phaser.GameObjects.Arc[] = [];
  private frameCount = 0;
  private timer = ROUND_TIME;

  constructor() {
    super({ key: "FightScene" });
  }

  create(): void {
    this.createArena();
    this.createFighters();
    this.gameState = {
      entity1: createFighterEntity(1, true),
      entity2: createFighterEntity(2, false),
      vfx: createVFXState(),
    };
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
      { isStatic: true },
    );
  }

  private createFighters(): void {
    const g1 = this.add.rectangle(200, 500, 40, 60, 0x3b82f6);
    const b1 = this.matter.add.rectangle(200, 500, 40, 60, { friction: 0.1 });
    const g2 = this.add.rectangle(600, 500, 40, 60, 0xef4444);
    const b2 = this.matter.add.rectangle(600, 500, 40, 60, { friction: 0.1 });
    this.f1 = { body: b1, graphics: g1 };
    this.f2 = { body: b2, graphics: g2 };
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
    if (!this.f1 || !this.f2 || !this.gameState) return;

    this.frameCount += 1;
    this.updateTimer();

    const x1 = this.f1.body.position.x;
    const y1 = this.f1.body.position.y;
    const x2 = this.f2.body.position.x;
    const y2 = this.f2.body.position.y;

    const action1 = this.ai1(
      createContext(this.gameState.entity1, this.gameState.entity2, x1),
    );
    const action2 = this.ai2(
      createContext(this.gameState.entity2, this.gameState.entity1, x2),
    );

    applyAction(
      action1,
      { body: this.f1.body, facingRight: true },
      this.matter,
    );
    applyAction(
      action2,
      { body: this.f2.body, facingRight: false },
      this.matter,
    );

    this.gameState = tickGameLoop(
      this.gameState,
      x1,
      y1,
      x2,
      y2,
      action1,
      action2,
    );

    this.syncGraphics(x1, y1, x2, y2);
    this.renderVFX();
    this.syncUIState();
  }

  private updateTimer(): void {
    if (this.frameCount % FRAMES_PER_SECOND === 0 && this.timer > 0) {
      this.timer -= 1;
    }
  }

  private syncGraphics(x1: number, y1: number, x2: number, y2: number): void {
    if (!this.f1 || !this.f2 || !this.gameState) return;
    this.f1.graphics.setPosition(x1, y1);
    this.f2.graphics.setPosition(x2, y2);
    this.f1.graphics.setFillStyle(
      getStateColor(this.gameState.entity1.context.state, 0x3b82f6),
    );
    this.f2.graphics.setFillStyle(
      getStateColor(this.gameState.entity2.context.state, 0xef4444),
    );
  }

  private renderVFX(): void {
    if (!this.gameState) return;
    for (const sprite of this.effectSprites) {
      sprite.destroy();
    }
    this.effectSprites = this.gameState.vfx.hitEffects.map((e) =>
      renderHitEffect(this, e),
    );
    applyScreenShake(this.cameras.main, this.gameState.vfx.screenShake);
  }

  private syncUIState(): void {
    if (!this.gameState) return;
    updateGameState({
      player1Health: this.gameState.entity1.context.health,
      player2Health: this.gameState.entity2.context.health,
      timer: this.timer,
    });
    emitStateChange();
  }
}
