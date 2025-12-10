import * as tf from "@tensorflow/tfjs";

const INPUT_SIZE = 7;
const HIDDEN_SIZE = 16;
const OUTPUT_SIZE = 4;

export type NNInput = Readonly<{
  distanceToEnemy: number;
  enemyX: number;
  enemyY: number;
  ownHealthPercent: number;
  enemyHealthPercent: number;
  nearWall: number;
  projectileIncoming: number;
}>;

export type NNOutput = Readonly<{
  block: number;
  jump: number;
  attack: number;
  move: number;
}>;

const createModel = (): tf.Sequential => {
  const model = tf.sequential();

  model.add(
    tf.layers.dense({
      inputShape: [INPUT_SIZE],
      units: HIDDEN_SIZE,
      activation: "relu",
    }),
  );

  model.add(
    tf.layers.dense({
      units: HIDDEN_SIZE,
      activation: "relu",
    }),
  );

  model.add(
    tf.layers.dense({
      units: OUTPUT_SIZE,
      activation: "softmax",
    }),
  );

  return model;
};

export const createTacticalNN = (): {
  predict: (input: NNInput) => NNOutput;
} => {
  const model = createModel();

  const predict = (input: NNInput): NNOutput => {
    const inputTensor = tf.tensor2d([
      [
        input.distanceToEnemy,
        input.enemyX,
        input.enemyY,
        input.ownHealthPercent,
        input.enemyHealthPercent,
        input.nearWall,
        input.projectileIncoming,
      ],
    ]);

    const output = model.predict(inputTensor) as tf.Tensor;
    const values = output.dataSync();

    inputTensor.dispose();
    output.dispose();

    return {
      block: values[0] ?? 0,
      jump: values[1] ?? 0,
      attack: values[2] ?? 0,
      move: values[3] ?? 0,
    };
  };

  return { predict };
};
