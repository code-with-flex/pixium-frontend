"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { getNetwork, isConnected, requestAccess } from "@stellar/freighter-api";
import { EXPECTED_NETWORK } from "./wallet.constants";

type WalletStatus = "disconnected" | "connecting" | "connected" | "error";

type WalletState = {
  status: WalletStatus;
  address: string | null;
  network: string | null;
  error: string | null;
};

type WalletContextValue = WalletState & {
  connect: () => Promise<void>;
  disconnect: () => void;
};

const initialState: WalletState = {
  status: "disconnected",
  address: null,
  network: null,
  error: null,
};

const WalletContext = createContext<WalletContextValue | null>(null);

/**
 * Wraps Freighter's extension API (`@stellar/freighter-api`) in React
 * state. Freighter has no "disconnect" call of its own — once a site is
 * allowed, the extension remembers it — so `disconnect()` here only
 * clears local app state; the player would need to revoke access from
 * the extension itself to fully disconnect.
 *
 * Read-only for now: this only exposes the connected address and
 * network, not transaction signing — that's wired up alongside pixel
 * placement in a later slice.
 */
export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletState>(initialState);

  const connect = useCallback(async () => {
    setState((prev) => ({ ...prev, status: "connecting", error: null }));

    const connected = await isConnected();
    if (connected.error || !connected.isConnected) {
      setState({
        ...initialState,
        status: "error",
        error: "Freighter isn't installed or enabled.",
      });
      return;
    }

    const access = await requestAccess();
    if (access.error || !access.address) {
      setState({
        ...initialState,
        status: "error",
        error: access.error?.message ?? "Wallet connection was declined.",
      });
      return;
    }

    const networkResult = await getNetwork();
    setState({
      status: "connected",
      address: access.address,
      network: networkResult.error ? null : networkResult.network,
      error: null,
    });
  }, []);

  const disconnect = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <WalletContext.Provider value={{ ...state, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return ctx;
}

/** True if the connected wallet's network doesn't match `NEXT_PUBLIC_NETWORK`. */
export function isWrongNetwork(network: string | null): boolean {
  return network !== null && network.toUpperCase() !== EXPECTED_NETWORK;
}
