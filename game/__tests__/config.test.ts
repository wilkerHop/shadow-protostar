import { describe, expect, it, vi } from "vitest";

// Mock Phaser to avoid canvas dependency in tests
vi.mock("phaser", () => ({
  AUTO: 0,
  Scale: { FIT: "fit", CENTER_BOTH: "center" },
}));

describe("game/config", () => {
  it("exports createGameConfig function", async () => {
    const module = await import("../config");

    expect(module.createGameConfig).toBeDefined();
    expect(typeof module.createGameConfig).toBe("function");
  });
});
