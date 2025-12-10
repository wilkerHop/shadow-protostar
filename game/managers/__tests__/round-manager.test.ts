import { describe, expect, it } from "vitest";
import {
  createRoundState,
  getWinner,
  triggerKO,
  updateRoundState,
} from "../round-manager";

describe("managers/round-manager", () => {
  describe("createRoundState", () => {
    it("initializes with intro status", () => {
      const state = createRoundState(3);

      expect(state.status).toBe("intro");
      expect(state.currentRound).toBe(1);
      expect(state.maxRounds).toBe(3);
    });
  });

  describe("triggerKO", () => {
    it("awards win to player 1", () => {
      const state = createRoundState();
      const result = triggerKO(state, 1);

      expect(result.player1Wins).toBe(1);
      expect(result.status).toBe("ko");
    });
  });

  describe("updateRoundState", () => {
    it("decrements timer", () => {
      const state = { ...createRoundState(), statusTimer: 10 };
      const result = updateRoundState(state);

      expect(result.statusTimer).toBe(9);
    });
  });

  describe("getWinner", () => {
    it("returns null when no winner", () => {
      const state = createRoundState(3);
      expect(getWinner(state)).toBeNull();
    });

    it("returns 1 when player 1 wins enough", () => {
      const state = { ...createRoundState(3), player1Wins: 2 };
      expect(getWinner(state)).toBe(1);
    });
  });
});
