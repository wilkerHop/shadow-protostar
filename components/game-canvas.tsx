"use client";

import Phaser from "phaser";
import { useEffect, useRef } from "react";
import { createGameConfig } from "@/game/config";
import { FightScene } from "@/game/scenes/fight-scene";

export const GameCanvas = (): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || gameRef.current) return;

    const config = createGameConfig(container, [FightScene]);
    gameRef.current = new Phaser.Game(config);

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: 800, height: 600 }}
      role="application"
      aria-label="Game Canvas"
    />
  );
};
