import Phaser from "phaser";
import { createAIController } from "@/game/ai/controller";
import { createFighterEntity } from "@/game/fighter/entity";
import { updateFighterParts } from "@/game/renderer/fighter-renderer";
import { emitStateChange, updateGameState } from "@/game/store";
import { createVFXState } from "@/game/vfx/hit-effects";
import { applyScreenShake, renderHitEffect } from "@/game/vfx/vfx-renderer";
import { applyAction } from "./actions";
import { type GameLoopState, tickGameLoop } from "./game-loop";
import {
  createBTContext,
  FIGHTER1_COLOR,
  FIGHTER2_COLOR,
  FRAMES_PER_SECOND,
  getTotalAttackFrames,
  ROUND_TIME,
} from "./scene-config";
import {
  createArena,
  createFighter1,
  createFighter2,
  type SceneFighter,
} from "./scene-factory";

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
    createArena(this.matter);
    this.f1 = createFighter1(this, this.matter);
    this.f2 = createFighter2(this, this.matter);
    this.gameState = {
      entity1: createFighterEntity(1, true),
      entity2: createFighterEntity(2, false),
      vfx: createVFXState(),
    };
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
    if (this.frameCount % FRAMES_PER_SECOND === 0 && this.timer > 0)
      this.timer -= 1;
    this.processFrame();
  }

  private processFrame(): void {
    if (!this.f1 || !this.f2 || !this.gameState) return;
    const [x1, y1, x2, y2] = [
      this.f1.body.position.x,
      this.f1.body.position.y,
      this.f2.body.position.x,
      this.f2.body.position.y,
    ];
    const action1 = this.ai1(
      createBTContext(this.gameState.entity1, this.gameState.entity2, x1, x2),
    );
    const action2 = this.ai2(
      createBTContext(this.gameState.entity2, this.gameState.entity1, x2, x1),
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
    this.syncUIState();
  }

  private syncGraphics(x1: number, y1: number, x2: number, y2: number): void {
    if (!this.f1 || !this.f2 || !this.gameState) return;
    const [e1, e2] = [this.gameState.entity1, this.gameState.entity2];
    updateFighterParts(
      this.f1.parts,
      x1,
      y1,
      e1.context.state,
      this.frameCount,
      e1.attackFrame,
      getTotalAttackFrames(e1),
      true,
      FIGHTER1_COLOR,
    );
    updateFighterParts(
      this.f2.parts,
      x2,
      y2,
      e2.context.state,
      this.frameCount,
      e2.attackFrame,
      getTotalAttackFrames(e2),
      false,
      FIGHTER2_COLOR,
    );
    for (const s of this.effectSprites) s.destroy();
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
