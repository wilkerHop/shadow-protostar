export type GameStatus = "waiting" | "fighting" | "finished";

export type GameState = Readonly<{
  player1Health: number;
  player2Health: number;
  timer: number;
  gameStatus: GameStatus;
}>;

const INITIAL_STATE: GameState = {
  player1Health: 100,
  player2Health: 100,
  timer: 99,
  gameStatus: "waiting",
};

type Listener = () => void;

const listeners = new Set<Listener>();
const state: { current: GameState } = { current: { ...INITIAL_STATE } };

export const subscribe = (listener: Listener): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getSnapshot = (): GameState => state.current;

export const getServerSnapshot = (): GameState => INITIAL_STATE;

export const updateGameState = (partial: Partial<GameState>): void => {
  state.current = { ...state.current, ...partial };
};

export const emitStateChange = (): void => {
  for (const listener of listeners) {
    listener();
  }
};

export const resetGameState = (): void => {
  state.current = { ...INITIAL_STATE };
  emitStateChange();
};
