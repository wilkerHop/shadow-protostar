import { describe, expect, it, vi } from "vitest";

vi.mock("phaser", () => ({
  default: { Scene: class {} },
}));

vi.mock("@/game/ai/controller", () => ({
  createAIController: () => () => "block",
}));

describe("scenes/fight-scene", () => {
  it("exports FightScene class", async () => {
    const module = await import("../fight-scene");
    expect(module.FightScene).toBeDefined();
  });
});
