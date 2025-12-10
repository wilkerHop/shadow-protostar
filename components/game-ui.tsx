"use client";

import { useGameState } from "@/game/hooks/use-game-state";

type HealthBarProps = Readonly<{
  health: number;
  label: string;
  color: string;
}>;

const HealthBar = ({
  health,
  label,
  color,
}: HealthBarProps): React.JSX.Element => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between text-sm font-bold text-white">
      <span>{label}</span>
      <span>{health}%</span>
    </div>
    <div className="h-5 w-52 overflow-hidden rounded-full bg-gray-800 shadow-inner">
      <div
        className="h-full rounded-full shadow-lg"
        style={{
          width: `${health}%`,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          transition: "width 150ms ease-out",
        }}
      />
    </div>
  </div>
);

const Timer = ({ value }: { value: number }): React.JSX.Element => (
  <div className="flex flex-col items-center">
    <div className="rounded-lg bg-gray-900/80 px-6 py-2 backdrop-blur">
      <span className="text-4xl font-bold tabular-nums text-white">
        {value}
      </span>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }): React.JSX.Element => (
  <span className="mt-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-emerald-400">
    {status}
  </span>
);

export const GameUI = (): React.JSX.Element => {
  const { player1Health, player2Health, timer, gameStatus } = useGameState();

  return (
    <div className="pointer-events-none absolute inset-0 p-6">
      <div className="flex items-start justify-between">
        <HealthBar health={player1Health} label="SHADOW" color="#3b82f6" />
        <div className="flex flex-col items-center">
          <Timer value={timer} />
          <StatusBadge status={gameStatus} />
        </div>
        <HealthBar health={player2Health} label="PROTO" color="#ef4444" />
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <span className="text-xs text-gray-500">
          AI vs AI • No Input Required
        </span>
      </div>
    </div>
  );
};
