import type { EntityId, World } from "./types";

export const createWorld = (): World => ({
  nextEntityId: 0,
  entities: new Set(),
  components: new Map(),
});

export const createEntity = (world: World): readonly [World, EntityId] => {
  const entityId = world.nextEntityId;
  const newEntities = new Set(world.entities);
  newEntities.add(entityId);

  return [
    {
      ...world,
      nextEntityId: entityId + 1,
      entities: newEntities,
    },
    entityId,
  ];
};

export const addComponent = <T>(
  world: World,
  entityId: EntityId,
  componentName: string,
  data: T,
): World => {
  const componentStore = world.components.get(componentName) ?? new Map();
  const newStore = new Map(componentStore);
  newStore.set(entityId, data);

  const newComponents = new Map(world.components);
  newComponents.set(componentName, newStore);

  return { ...world, components: newComponents };
};

export const getComponent = <T>(
  world: World,
  entityId: EntityId,
  componentName: string,
): T | undefined => {
  const store = world.components.get(componentName);
  return store?.get(entityId) as T | undefined;
};

export const query = (world: World, ...componentNames: string[]): EntityId[] =>
  [...world.entities].filter((entityId) =>
    componentNames.every((name) => world.components.get(name)?.has(entityId)),
  );
