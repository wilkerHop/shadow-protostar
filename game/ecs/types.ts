export type EntityId = number;

export type ComponentMap = Record<string, unknown>;

export type World = {
  readonly nextEntityId: number;
  readonly entities: Set<EntityId>;
  readonly components: Map<string, Map<EntityId, unknown>>;
};

export type System = (world: World, deltaTime: number) => World;
