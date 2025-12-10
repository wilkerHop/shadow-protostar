import { describe, expect, it } from "vitest";
import {
  getServerSnapshot,
  getSnapshot,
  resetGameState,
  subscribe,
  updateGameState,
} from "../store";

describe("game/store", () => {
  describe("getSnapshot", () => {
    it("returns current game state", () => {
      const state = getSnapshot();

      expect(state.player1Health).toBeDefined();
      expect(state.player2Health).toBeDefined();
      expect(state.timer).toBeDefined();
    });
  });

  describe("getServerSnapshot", () => {
    it("returns initial state for SSR", () => {
      const state = getServerSnapshot();

      expect(state.player1Health).toBe(100);
      expect(state.timer).toBe(99);
    });
  });

  describe("subscribe", () => {
    it("returns unsubscribe function", () => {
      const unsubscribe = subscribe(() => undefined);

      expect(typeof unsubscribe).toBe("function");
      unsubscribe();
    });
  });

  describe("updateGameState", () => {
    it("updates partial state", () => {
      resetGameState();
      updateGameState({ timer: 50 });

      expect(getSnapshot().timer).toBe(50);
      resetGameState();
    });
  });
});
