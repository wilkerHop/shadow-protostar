// Move Frame Data
export type MoveData = Readonly<{
  name: string;
  damage: number;
  startup: number; // frames before hitbox active
  active: number; // frames hitbox is active
  recovery: number; // frames after hitbox inactive
  hitbox: Readonly<{
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
  }>;
  knockback: Readonly<{
    x: number;
    y: number;
  }>;
  type: "strike" | "projectile" | "grab";
}>;

// Fighter Configuration
export type FighterConfig = Readonly<{
  name: string;
  health: number;
  walkSpeed: number;
  jumpForce: number;
  moves: Readonly<Record<string, MoveData>>;
}>;
