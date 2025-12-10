import { describe, expect, it } from "vitest";
import { createInput, INPUT } from "../../components";
import { addComponent, createEntity, createWorld } from "../../world";
import { createInputSystem } from "../input";

describe("ecs/systems/input", () => {
  it("updates input actions from key state", () => {
    const [w1, e1] = createEntity(createWorld());
    const w2 = addComponent(w1, e1, INPUT, createInput());

    const getKeyState = () => ({
      left: true,
      right: false,
      up: true,
      attack: false,
      block: false,
    });

    const inputSystem = createInputSystem(getKeyState);
    const result = inputSystem(w2);
    const input = result.components.get(INPUT)?.get(e1) as {
      actions: string[];
    };

    expect(input.actions).toContain("left");
    expect(input.actions).toContain("jump");
    expect(input.actions).not.toContain("right");
  });
});
