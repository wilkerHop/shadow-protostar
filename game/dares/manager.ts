export type DareType =
  | "land_combo"
  | "jump_projectiles"
  | "perfect_block"
  | "no_damage";

export type Dare = Readonly<{
  id: string;
  type: DareType;
  description: string;
  target: number;
  progress: number;
  completed: boolean;
  stars: number;
}>;

type DareConfig = Readonly<{
  type: DareType;
  description: string;
  target: number;
  stars: number;
}>;

const DARE_CONFIGS: readonly DareConfig[] = [
  {
    type: "land_combo",
    description: "Land a 3-hit combo",
    target: 3,
    stars: 1,
  },
  {
    type: "jump_projectiles",
    description: "Jump over 2 projectiles",
    target: 2,
    stars: 1,
  },
  {
    type: "perfect_block",
    description: "Perfect block 3 attacks",
    target: 3,
    stars: 2,
  },
  {
    type: "no_damage",
    description: "Take no damage for 10 seconds",
    target: 10,
    stars: 3,
  },
];

const generateId = (): string =>
  `dare_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export const createRandomDare = (): Dare => {
  const config = DARE_CONFIGS[Math.floor(Math.random() * DARE_CONFIGS.length)];
  if (!config) {
    return createDare("land_combo", "Land a 3-hit combo", 3, 1);
  }
  return createDare(
    config.type,
    config.description,
    config.target,
    config.stars,
  );
};

const createDare = (
  type: DareType,
  description: string,
  target: number,
  stars: number,
): Dare => ({
  id: generateId(),
  type,
  description,
  target,
  progress: 0,
  completed: false,
  stars,
});

export const updateDareProgress = (dare: Dare, increment: number): Dare => {
  const newProgress = Math.min(dare.progress + increment, dare.target);
  return {
    ...dare,
    progress: newProgress,
    completed: newProgress >= dare.target,
  };
};

export const isDareComplete = (dare: Dare): boolean => dare.completed;
