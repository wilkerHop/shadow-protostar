export type RoundState = Readonly<{
  currentRound: number;
  maxRounds: number;
  player1Wins: number;
  player2Wins: number;
  status: "intro" | "fighting" | "ko" | "round_end" | "match_end";
  statusTimer: number;
}>;

const INTRO_DURATION = 90;
const KO_DURATION = 120;
const ROUND_END_DURATION = 60;

export const createRoundState = (maxRounds = 3): RoundState => ({
  currentRound: 1,
  maxRounds,
  player1Wins: 0,
  player2Wins: 0,
  status: "intro",
  statusTimer: INTRO_DURATION,
});

export const startFighting = (state: RoundState): RoundState => ({
  ...state,
  status: "fighting",
  statusTimer: 0,
});

export const triggerKO = (state: RoundState, winner: 1 | 2): RoundState => ({
  ...state,
  status: "ko",
  statusTimer: KO_DURATION,
  player1Wins: winner === 1 ? state.player1Wins + 1 : state.player1Wins,
  player2Wins: winner === 2 ? state.player2Wins + 1 : state.player2Wins,
});

export const updateRoundState = (state: RoundState): RoundState => {
  if (state.statusTimer <= 0) return state;

  const newTimer = state.statusTimer - 1;

  if (newTimer <= 0) {
    if (state.status === "intro") return startFighting(state);
    if (state.status === "ko")
      return { ...state, status: "round_end", statusTimer: ROUND_END_DURATION };
    if (state.status === "round_end") return nextRound(state);
  }

  return { ...state, statusTimer: newTimer };
};

const nextRound = (state: RoundState): RoundState => {
  const winsNeeded = Math.ceil(state.maxRounds / 2);
  const matchOver =
    state.player1Wins >= winsNeeded || state.player2Wins >= winsNeeded;

  if (matchOver) return { ...state, status: "match_end", statusTimer: 0 };

  return {
    ...state,
    currentRound: state.currentRound + 1,
    status: "intro",
    statusTimer: INTRO_DURATION,
  };
};

export const getWinner = (state: RoundState): 1 | 2 | null => {
  const winsNeeded = Math.ceil(state.maxRounds / 2);
  if (state.player1Wins >= winsNeeded) return 1;
  if (state.player2Wins >= winsNeeded) return 2;
  return null;
};
