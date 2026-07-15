/**
 * Expected network, per the `NEXT_PUBLIC_NETWORK` env var (see
 * `.env.example`). Used to warn the player if their Freighter wallet is
 * connected to a different network than the app expects — Freighter's
 * `getNetwork()` returns values like `"TESTNET"` / `"PUBLIC"`.
 */
export const EXPECTED_NETWORK = (
  process.env.NEXT_PUBLIC_NETWORK ?? "testnet"
).toUpperCase();
