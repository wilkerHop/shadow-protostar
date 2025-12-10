import { GameContainer } from "@/components/game-container";

export default function Home(): React.JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900">
      <h1 className="mb-8 text-4xl font-bold text-white">Shadow Protostar</h1>
      <GameContainer />
    </main>
  );
}
