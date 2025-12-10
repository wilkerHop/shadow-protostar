"use client";

import { useGameState } from "@/game/hooks/use-game-state";

type HealthBarProps = Readonly<{
  health: number;
  player: "P1" | "P2";
  flipped?: boolean;
}>;

const HealthBar = ({
  health,
  player,
  flipped,
}: HealthBarProps): React.JSX.Element => (
  <div
    className="flex flex-col gap-1"
    style={{ alignItems: flipped ? "flex-end" : "flex-start" }}
  >
    <span className="text-sm font-bold text-white">{player}</span>
    <div
      className="h-4 w-48 overflow-hidden rounded bg-gray-700"
      style={{ transform: flipped ? "scaleX(-1)" : undefined }}
    >
      <div
        className="h-full bg-gradient-to-r from-red-500 to-yellow-400"
        style={{ width: `${health}%`, transition: "width 0.2s" }}
      />
    </div>
  </div>
);

export const GameUI = (): React.JSX.Element => {
  const { player1Health, player2Health, timer, gameStatus } = useGameState();

  return (
    <div className="pointer-events-none absolute inset-0 p-4">
      <div className="flex items-start justify-between">
        <HealthBar health={player1Health} player="P1" />
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-white">{timer}</span>
          <span className="text-xs uppercase text-gray-400">{gameStatus}</span>
        </div>
        <HealthBar health={player2Health} player="P2" flipped />
      </div>
    </div>
  );
};
