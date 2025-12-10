import { describe, expect, it } from "vitest";
import {
  canTransition,
  createFighterContext,
  tickState,
  transitionTo,
} from "../state-machine";

describe("fighter/state-machine", () => {
  describe("createFighterContext", () => {
    it("creates initial context facing right", () => {
      const ctx = createFighterContext(true);

      expect(ctx.state).toBe("idle");
      expect(ctx.facingRight).toBe(true);
      expect(ctx.health).toBe(100);
    });
  });

  describe("canTransition", () => {
    it("allows idle to walking", () => {
      const ctx = createFighterContext(true);
      expect(canTransition("idle", "walking", ctx)).toBe(true);
    });

    it("blocks jump when not grounded", () => {
      const ctx = { ...createFighterContext(true), isGrounded: false };
      expect(canTransition("idle", "jumping", ctx)).toBe(false);
    });

    it("blocks actions during hitstun", () => {
      const ctx = { ...createFighterContext(true), hitstunRemaining: 10 };
      expect(
        canTransition("hitstun", "attacking", { ...ctx, state: "hitstun" }),
      ).toBe(false);
    });
  });

  describe("transitionTo", () => {
    it("transitions to new state", () => {
      const ctx = createFighterContext(true);
      const newCtx = transitionTo(ctx, "walking");

      expect(newCtx.state).toBe("walking");
      expect(newCtx.stateFrame).toBe(0);
    });
  });

  describe("tickState", () => {
    it("increments state frame", () => {
      const ctx = createFighterContext(true);
      const newCtx = tickState(ctx);

      expect(newCtx.stateFrame).toBe(1);
    });

    it("decrements hitstun", () => {
      const ctx = { ...createFighterContext(true), hitstunRemaining: 5 };
      const newCtx = tickState(ctx);

      expect(newCtx.hitstunRemaining).toBe(4);
    });
  });
});
