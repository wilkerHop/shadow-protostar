export type HazardType = "spike" | "fire" | "electric";

export type Hazard = Readonly<{
  id: string;
  type: HazardType;
  x: number;
  y: number;
  width: number;
  height: number;
  damage: number;
  active: boolean;
  spawnTime: number;
}>;

export type HazardConfig = Readonly<{
  type: HazardType;
  damage: number;
  width: number;
  height: number;
}>;

const HAZARD_CONFIGS: Record<HazardType, HazardConfig> = {
  spike: { type: "spike", damage: 5, width: 40, height: 20 },
  fire: { type: "fire", damage: 3, width: 60, height: 40 },
  electric: { type: "electric", damage: 8, width: 30, height: 100 },
};

const generateId = (): string =>
  `hazard_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export const createHazard = (
  type: HazardType,
  x: number,
  y: number,
): Hazard => ({
  id: generateId(),
  ...HAZARD_CONFIGS[type],
  x,
  y,
  active: true,
  spawnTime: Date.now(),
});

export const spawnRandomHazard = (
  arenaLeft: number,
  arenaRight: number,
  floorY: number,
): Hazard => {
  const types: HazardType[] = ["spike", "fire", "electric"];
  const type = types[Math.floor(Math.random() * types.length)] ?? "spike";
  const x = arenaLeft + Math.random() * (arenaRight - arenaLeft - 60);
  const y = floorY - 30;

  return createHazard(type, x, y);
};
