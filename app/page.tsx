import { GameContainer } from "@/components/game-container";

export default function Home(): React.JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-black tracking-tight text-white">
          Shadow <span className="text-blue-500">Proto</span>
          <span className="text-red-500">star</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Neural Network Fighting Game
        </p>
      </div>
      <div className="rounded-xl border border-zinc-800 p-2 shadow-2xl shadow-black/50">
        <GameContainer />
      </div>
      <p className="mt-6 text-xs text-zinc-600">
        Built with Next.js 16 • Phaser 3 • TensorFlow.js • Matter.js
      </p>
    </main>
  );
}
