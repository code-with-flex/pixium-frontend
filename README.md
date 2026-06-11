# Pixium Player Interface

Next.js application for the Pixium collaborative pixel canvas — connect your Stellar wallet, paint pixels, and watch the canvas evolve in real time.

---

## Overview

The frontend is the player-facing experience for Pixium. It renders the shared canvas, handles Stellar wallet connections via Freighter, sends pixel placement transactions directly to the Soroban contracts, and streams real-time updates from the backend WebSocket so every player sees the same canvas as it evolves.

---

## Tech Stack

- **Next.js + React** — framework and UI library
- **TypeScript** — type-safe throughout
- **Tailwind CSS** — utility-first styling
- **Freighter API** — Stellar browser wallet integration
- **Stellar SDK** — transaction building and submission
- **HTML5 Canvas / WebGL** — canvas rendering
- **WebSocket** — real-time pixel event streaming

---

## Getting Started

### Prerequisites

- Node.js 20+
- [Freighter wallet](https://freighter.app) browser extension
- A running [backend](https://github.com/Pixium-Org/backend) instance

### Install

```bash
npm install
```

### Environment

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:3000/canvas
NEXT_PUBLIC_CONTRACT_ID=<canvas_contract_address>
NEXT_PUBLIC_NETWORK=testnet
```

### Run (Development)

```bash
npm run dev
```

### Build (Production)

```bash
npm run build
npm run start
```

---

## Features

### MVP
- Stellar wallet connection via Freighter
- Full canvas render (HTML5 Canvas)
- Real-time pixel updates via WebSocket
- Color picker from the active palette
- Click to place a pixel (submits a Soroban transaction)
- Cooldown timer display

### Post-MVP
- Quest panel — active quests and progress tracking
- Leaderboard sidebar — global and faction rankings
- Faction UI — create, join, and view faction members
- Color voting — daily vote for new palette colors
- NFT minting — select a canvas region and mint it as an NFT
- Template overlay — see the target community template on the canvas

---

## Project Structure

```
frontend/
├── app/                  # Next.js app router
│   ├── page.tsx          # Main canvas page
│   ├── leaderboard/
│   ├── quests/
│   └── factions/
├── components/
│   ├── Canvas/           # Canvas render and interaction
│   ├── ColorPicker/
│   ├── CooldownTimer/
│   ├── WalletConnect/
│   └── ui/               # Shared UI primitives
├── hooks/
│   ├── useCanvas.ts      # Canvas state and WebSocket
│   ├── useWallet.ts      # Freighter wallet connection
│   └── usePixelPlace.ts  # Transaction building and submission
├── lib/
│   ├── stellar.ts        # Stellar SDK helpers
│   └── api.ts            # Backend API client
├── .env.example
└── package.json
```

---

## Wallet Integration

Pixium uses [Freighter](https://freighter.app) for Stellar wallet connections. Pixel placement transactions are built client-side and signed by the player's wallet — the frontend never holds private keys.

```ts
import { getPublicKey, signTransaction } from "@stellar/freighter-api";

const publicKey = await getPublicKey();
const signedTx = await signTransaction(xdr, { network: "TESTNET" });
```

---

## Contributing

See the root [contributing guide](#). Run lint and format checks before submitting a PR.

```bash
npm run lint
npm run format
```

Branch format: `feature/<issue-number>-short-description`

---

## Related Repos

- [`onchain`](https://github.com/Pixium-Org/onchain) — Soroban smart contracts
- [`backend`](https://github.com/Pixium-Org/backend) — REST API and WebSocket services
- [`indexer`](https://github.com/Pixium-Org/indexer) — Stellar event indexer
