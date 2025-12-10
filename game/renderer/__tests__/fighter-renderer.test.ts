import { describe, expect, it } from "vitest";

describe("renderer/fighter-renderer", () => {
  describe("module exports", () => {
    it("exports createFighterParts function", async () => {
      const mod = await import("../fighter-renderer");
      expect(typeof mod.createFighterParts).toBe("function");
    });

    it("exports updateFighterParts function", async () => {
      const mod = await import("../fighter-renderer");
      expect(typeof mod.updateFighterParts).toBe("function");
    });

    it("exports destroyFighterParts function", async () => {
      const mod = await import("../fighter-renderer");
      expect(typeof mod.destroyFighterParts).toBe("function");
    });
  });
});
