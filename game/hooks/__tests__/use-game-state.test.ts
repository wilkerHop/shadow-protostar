import { describe, expect, it } from "vitest";

// Hook tests require React testing library, but we verify the export exists
describe("game/hooks/use-game-state", () => {
  it("exports useGameState hook", async () => {
    const module = await import("../use-game-state");

    expect(module.useGameState).toBeDefined();
    expect(typeof module.useGameState).toBe("function");
  });
});
