import type { MoveData } from "./types";

// Shared moves
export const JAB: MoveData = {
  name: "jab",
  damage: 5,
  startup: 3,
  active: 2,
  recovery: 8,
  hitbox: { width: 40, height: 20, offsetX: 30, offsetY: 0 },
  knockback: { x: 2, y: 0 },
  type: "strike",
};

export const KICK: MoveData = {
  name: "kick",
  damage: 8,
  startup: 6,
  active: 3,
  recovery: 12,
  hitbox: { width: 50, height: 25, offsetX: 35, offsetY: 10 },
  knockback: { x: 4, y: 1 },
  type: "strike",
};

// Shadow-exclusive moves (Projectile focus)
export const FIREBALL: MoveData = {
  name: "fireball",
  damage: 10,
  startup: 12,
  active: 60,
  recovery: 18,
  hitbox: { width: 30, height: 30, offsetX: 50, offsetY: 0 },
  knockback: { x: 6, y: 0 },
  type: "projectile",
};

export const SHADOW_BEAM: MoveData = {
  name: "shadow_beam",
  damage: 15,
  startup: 20,
  active: 10,
  recovery: 25,
  hitbox: { width: 200, height: 20, offsetX: 40, offsetY: 0 },
  knockback: { x: 10, y: 2 },
  type: "strike",
};

// Proto-exclusive moves (Grapple focus)
export const GRAB: MoveData = {
  name: "grab",
  damage: 0,
  startup: 5,
  active: 5,
  recovery: 20,
  hitbox: { width: 35, height: 60, offsetX: 25, offsetY: 0 },
  knockback: { x: 0, y: 0 },
  type: "grab",
};

export const THROW: MoveData = {
  name: "throw",
  damage: 12,
  startup: 0,
  active: 1,
  recovery: 15,
  hitbox: { width: 0, height: 0, offsetX: 0, offsetY: 0 },
  knockback: { x: 15, y: 8 },
  type: "grab",
};
