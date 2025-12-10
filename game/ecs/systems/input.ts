import { INPUT, type InputAction, type InputComponent } from "../components";
import type { World } from "../types";
import { addComponent, query } from "../world";

type KeyState = Readonly<{
  left: boolean;
  right: boolean;
  up: boolean;
  attack: boolean;
  block: boolean;
}>;

const keyStateToActions = (keys: KeyState): readonly InputAction[] => {
  const actions: InputAction[] = [];

  if (keys.left) actions.push("left");
  if (keys.right) actions.push("right");
  if (keys.up) actions.push("jump");
  if (keys.attack) actions.push("attack");
  if (keys.block) actions.push("block");

  return actions;
};

export const createInputSystem = (
  getKeyState: () => KeyState,
): ((world: World) => World) => {
  return (world: World): World => {
    const entities = query(world, INPUT);
    const keys = getKeyState();
    const actions = keyStateToActions(keys);

    return entities.reduce((currentWorld, entityId) => {
      const newInput: InputComponent = { actions };
      return addComponent(currentWorld, entityId, INPUT, newInput);
    }, world);
  };
};
