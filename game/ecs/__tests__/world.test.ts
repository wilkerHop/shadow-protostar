import { describe, expect, it } from "vitest";
import {
  addComponent,
  createEntity,
  createWorld,
  getComponent,
  query,
} from "../world";

describe("world", () => {
  describe("createWorld", () => {
    it("creates a world with initial state", () => {
      const world = createWorld();

      expect(world.nextEntityId).toBe(0);
      expect(world.entities.size).toBe(0);
      expect(world.components.size).toBe(0);
    });
  });

  describe("createEntity", () => {
    it("creates an entity and returns new world with entity", () => {
      const world = createWorld();
      const [newWorld, entityId] = createEntity(world);

      expect(entityId).toBe(0);
      expect(newWorld.nextEntityId).toBe(1);
      expect(newWorld.entities.has(0)).toBe(true);
    });

    it("increments entity IDs", () => {
      const world = createWorld();
      const [world1, id1] = createEntity(world);
      const [world2, id2] = createEntity(world1);

      expect(id1).toBe(0);
      expect(id2).toBe(1);
      expect(world2.entities.size).toBe(2);
    });
  });

  describe("addComponent", () => {
    it("adds a component to an entity", () => {
      const [world, entityId] = createEntity(createWorld());
      const newWorld = addComponent(world, entityId, "health", { hp: 100 });

      expect(newWorld.components.get("health")?.get(entityId)).toEqual({
        hp: 100,
      });
    });
  });

  describe("getComponent", () => {
    it("retrieves a component from an entity", () => {
      const [world, entityId] = createEntity(createWorld());
      const newWorld = addComponent(world, entityId, "health", { hp: 100 });

      const health = getComponent<{ hp: number }>(newWorld, entityId, "health");
      expect(health).toEqual({ hp: 100 });
    });

    it("returns undefined for missing component", () => {
      const [world, entityId] = createEntity(createWorld());

      const health = getComponent(world, entityId, "health");
      expect(health).toBeUndefined();
    });
  });

  describe("query", () => {
    it("returns entities with all specified components", () => {
      const [w1, e1] = createEntity(createWorld());
      const [w2, e2] = createEntity(w1);
      const w3 = addComponent(w2, e1, "health", { hp: 100 });
      const w4 = addComponent(w3, e1, "position", { x: 0, y: 0 });
      const w5 = addComponent(w4, e2, "health", { hp: 50 });

      const result = query(w5, "health", "position");

      expect(result).toEqual([e1]);
    });
  });
});
