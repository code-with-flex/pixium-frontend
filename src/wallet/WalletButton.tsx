"use client";

import { EXPECTED_NETWORK } from "./wallet.constants";
import { isWrongNetwork, useWallet } from "./WalletContext";

function truncateAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function WalletButton() {
  const { status, address, network, error, connect, disconnect } = useWallet();

  if (status === "connected" && address) {
    return (
      <div className="flex items-center gap-2 text-sm">
        {isWrongNetwork(network) && (
          <span className="rounded-full bg-amber-100 px-2 py-1 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
            Wrong network — expected {EXPECTED_NETWORK}
          </span>
        )}
        <span className="rounded-full bg-zinc-100 px-3 py-1.5 font-mono text-black dark:bg-zinc-800 dark:text-zinc-50">
          {truncateAddress(address)}
        </span>
        <button
          onClick={disconnect}
          className="rounded-full border border-zinc-300 px-3 py-1.5 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1 text-sm">
      <button
        onClick={connect}
        disabled={status === "connecting"}
        className="rounded-full bg-foreground px-4 py-1.5 text-background transition-colors hover:bg-[#383838] disabled:opacity-50 dark:hover:bg-[#ccc]"
      >
        {status === "connecting" ? "Connecting…" : "Connect Wallet"}
      </button>
      {status === "error" && error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
}
