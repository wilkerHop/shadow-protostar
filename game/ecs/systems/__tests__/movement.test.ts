import { describe, expect, it } from "vitest";
import {
  createPosition,
  createVelocity,
  POSITION,
  VELOCITY,
} from "../../components";
import { addComponent, createEntity, createWorld } from "../../world";
import { movementSystem } from "../movement";

describe("ecs/systems/movement", () => {
  it("updates position based on velocity", () => {
    const [w1, e1] = createEntity(createWorld());
    const w2 = addComponent(w1, e1, POSITION, createPosition(0, 0));
    const w3 = addComponent(w2, e1, VELOCITY, createVelocity(5, 3));

    const result = movementSystem(w3);
    const pos = result.components.get(POSITION)?.get(e1) as {
      x: number;
      y: number;
    };

    expect(pos.x).toBe(5);
    expect(pos.y).toBe(3);
  });

  it("ignores entities without velocity", () => {
    const [w1, e1] = createEntity(createWorld());
    const w2 = addComponent(w1, e1, POSITION, createPosition(10, 10));

    const result = movementSystem(w2);
    const pos = result.components.get(POSITION)?.get(e1) as {
      x: number;
      y: number;
    };

    expect(pos.x).toBe(10);
    expect(pos.y).toBe(10);
  });
});
