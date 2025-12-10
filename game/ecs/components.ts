// Health Component
export type HealthComponent = Readonly<{
  current: number;
  max: number;
}>;

export const createHealth = (max: number): HealthComponent => ({
  current: max,
  max,
});

// Position Component
export type PositionComponent = Readonly<{
  x: number;
  y: number;
}>;

export const createPosition = (x: number, y: number): PositionComponent => ({
  x,
  y,
});

// Velocity Component
export type VelocityComponent = Readonly<{
  vx: number;
  vy: number;
}>;

export const createVelocity = (
  vx: number = 0,
  vy: number = 0,
): VelocityComponent => ({ vx, vy });

// Fighter State Component
export type FighterState =
  | "idle"
  | "walking"
  | "jumping"
  | "attacking"
  | "blocking"
  | "hitstun";

export type FighterComponent = Readonly<{
  state: FighterState;
  facingRight: boolean;
  currentMove: string | null;
  moveFrame: number;
}>;

export const createFighter = (facingRight: boolean): FighterComponent => ({
  state: "idle",
  facingRight,
  currentMove: null,
  moveFrame: 0,
});

// Input Component
export type InputAction = "left" | "right" | "jump" | "attack" | "block";

export type InputComponent = Readonly<{
  actions: readonly InputAction[];
}>;

export const createInput = (): InputComponent => ({
  actions: [],
});

// Component Names (string constants)
export const HEALTH = "health" as const;
export const POSITION = "position" as const;
export const VELOCITY = "velocity" as const;
export const FIGHTER = "fighter" as const;
export const INPUT = "input" as const;
