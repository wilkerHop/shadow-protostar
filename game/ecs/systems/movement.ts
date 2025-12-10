import {
  POSITION,
  type PositionComponent,
  VELOCITY,
  type VelocityComponent,
} from "../components";
import type { World } from "../types";
import { addComponent, getComponent, query } from "../world";

export const movementSystem = (world: World): World => {
  const entities = query(world, POSITION, VELOCITY);

  return entities.reduce((currentWorld, entityId) => {
    const position = getComponent<PositionComponent>(
      currentWorld,
      entityId,
      POSITION,
    );
    const velocity = getComponent<VelocityComponent>(
      currentWorld,
      entityId,
      VELOCITY,
    );

    if (!position || !velocity) return currentWorld;

    const newPosition: PositionComponent = {
      x: position.x + velocity.vx,
      y: position.y + velocity.vy,
    };

    return addComponent(currentWorld, entityId, POSITION, newPosition);
  }, world);
};
