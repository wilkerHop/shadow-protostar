export type BTStatus = "success" | "failure" | "running";

export type BTContext = Readonly<{
  ownHealth: number;
  ownMaxHealth: number;
  enemyHealth: number;
  enemyMaxHealth: number;
  distanceToEnemy: number;
  nearWall: boolean;
  projectileIncoming: boolean;
}>;

export type BTNode = (context: BTContext) => BTStatus;

export type BTAction = "block" | "jump" | "attack" | "retreat" | "advance";

export type ActionResult = Readonly<{
  status: BTStatus;
  action: BTAction | null;
}>;

export type BTActionNode = (context: BTContext) => ActionResult;
