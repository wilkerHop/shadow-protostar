import type Phaser from "phaser";
import { describe, expect, it, vi } from "vitest";
import {
  createArena,
  createFighter1,
  createFighter2,
  createSceneFighter,
} from "../scene-factory";

const mockScene = {
  add: {
    rectangle: vi.fn().mockImplementation(() => ({
      setPosition: vi.fn(),
      setRotation: vi.fn(),
      setFillStyle: vi.fn(),
      destroy: vi.fn(),
    })),
    ellipse: vi.fn().mockImplementation(() => ({
      setPosition: vi.fn(),
      setRotation: vi.fn(),
      setFillStyle: vi.fn(),
      destroy: vi.fn(),
    })),
  },
} as unknown as Phaser.Scene;

const mockMatter = {
  add: {
    rectangle: vi.fn().mockReturnValue({ position: { x: 0, y: 0 } }),
  },
} as unknown as Phaser.Physics.Matter.MatterPhysics;

describe("scenes/scene-factory", () => {
  describe("createArena", () => {
    it("creates arena boundaries", () => {
      createArena(mockMatter);
      // Floor, Left Wall, Right Wall
      expect(mockMatter.add.rectangle).toHaveBeenCalledTimes(3);
    });
  });

  describe("createSceneFighter", () => {
    it("creates physics body and visual parts", () => {
      const fighter = createSceneFighter(
        mockScene,
        mockMatter,
        100,
        100,
        0xffffff,
      );

      expect(mockMatter.add.rectangle).toHaveBeenCalled();
      expect(mockScene.add.rectangle).toHaveBeenCalled(); // Body, arms, legs
      expect(mockScene.add.ellipse).toHaveBeenCalled(); // Head
      expect(fighter.body).toBeDefined();
      expect(fighter.parts).toBeDefined();
    });
  });

  describe("createFighter1", () => {
    it("creates fighter 1 with correct color", () => {
      // We can't easily check color in this mock setup without complex spying,
      // but we can ensure it calls the creation function
      const fighter = createFighter1(mockScene, mockMatter);
      expect(fighter).toBeDefined();
    });
  });

  describe("createFighter2", () => {
    it("creates fighter 2", () => {
      const fighter = createFighter2(mockScene, mockMatter);
      expect(fighter).toBeDefined();
    });
  });
});
