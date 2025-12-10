export type Box = Readonly<{
  x: number;
  y: number;
  width: number;
  height: number;
}>;

export type Hitbox = Box &
  Readonly<{
    damage: number;
    hitstun: number;
    knockbackX: number;
    knockbackY: number;
  }>;

export type Hurtbox = Box;

export const createHitbox = (
  x: number,
  y: number,
  width: number,
  height: number,
  damage: number,
  hitstun: number,
  knockbackX: number,
  knockbackY: number,
): Hitbox => ({
  x,
  y,
  width,
  height,
  damage,
  hitstun,
  knockbackX,
  knockbackY,
});

export const createHurtbox = (
  x: number,
  y: number,
  width: number,
  height: number,
): Hurtbox => ({ x, y, width, height });

export const boxesOverlap = (a: Box, b: Box): boolean => {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
};

export const offsetBox = <T extends Box>(
  box: T,
  offsetX: number,
  offsetY: number,
): T => ({
  ...box,
  x: box.x + offsetX,
  y: box.y + offsetY,
});
