import { FIREBALL, GRAB, JAB, KICK, SHADOW_BEAM, THROW } from "./moves";
import type { FighterConfig } from "./types";

// Shadow - Projectile-focused fighter
export const SHADOW: FighterConfig = {
  name: "Shadow",
  health: 100,
  walkSpeed: 4,
  jumpForce: 12,
  moves: {
    jab: JAB,
    kick: KICK,
    special1: FIREBALL,
    special2: SHADOW_BEAM,
  },
};

// Proto - Grapple-focused fighter
export const PROTO: FighterConfig = {
  name: "Proto",
  health: 110,
  walkSpeed: 3.5,
  jumpForce: 10,
  moves: {
    jab: JAB,
    kick: KICK,
    special1: GRAB,
    special2: THROW,
  },
};

export const ROSTER: readonly FighterConfig[] = [SHADOW, PROTO] as const;
