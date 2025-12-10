"use client";

import dynamic from "next/dynamic";
import { GameUI } from "./game-ui";

const GameCanvas = dynamic(
  () => import("./game-canvas").then((mod) => mod.GameCanvas),
  { ssr: false },
);

export const GameContainer = (): React.JSX.Element => (
  <div className="relative inline-block">
    <GameCanvas />
    <GameUI />
  </div>
);
