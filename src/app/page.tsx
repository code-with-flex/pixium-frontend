import { CanvasView } from "@/canvas/CanvasView";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 p-8 font-sans dark:bg-black">
      <h1 className="text-xl font-semibold text-black dark:text-zinc-50">
        Pixium
      </h1>
      <CanvasView />
    </div>
  );
}
