import { CanvasView } from "@/canvas/CanvasView";
import { WalletButton } from "@/wallet/WalletButton";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-6 bg-zinc-50 p-8 font-sans dark:bg-black">
      <div className="flex w-full max-w-3xl items-center justify-between">
        <h1 className="text-xl font-semibold text-black dark:text-zinc-50">
          Pixium
        </h1>
        <WalletButton />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <CanvasView />
      </div>
    </div>
  );
}
