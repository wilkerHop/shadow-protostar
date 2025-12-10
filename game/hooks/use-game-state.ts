"use client";

import { useSyncExternalStore } from "react";
import {
  type GameState,
  getServerSnapshot,
  getSnapshot,
  subscribe,
} from "../store";

export const useGameState = (): GameState =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
