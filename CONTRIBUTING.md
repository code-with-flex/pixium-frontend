# Contributing to `frontend`

This repo contains the Pixium player interface, built with Next.js, React, and Tailwind CSS.

For general contribution guidelines (branching, commits, code of conduct), see the [org-level contributing guide](https://github.com/Pixium-Org/.github/blob/main/CONTRIBUTING.md).

---

## Prerequisites

- Node.js 20+
- [Freighter wallet](https://freighter.app) browser extension (for testing wallet flows)
- A running [backend](https://github.com/Pixium-Org/backend) instance

---

## Setup

```bash
git clone https://github.com/Pixium-Org/frontend.git
cd frontend
pnpm install
```

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:3000/canvas
NEXT_PUBLIC_CONTRACT_ID=<canvas_contract_address>
NEXT_PUBLIC_NETWORK=testnet
```

---

## Running Locally

```bash
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## Building for Production

```bash
pnpm run build
pnpm run start
```

---

## Running Tests

```bash
pnpm run test
```

> No test framework is wired up yet — this command doesn't exist in
> `package.json` yet either. Tracked as a separate follow-up.

---

## Code Style

All PRs must pass lint and format checks:

```bash
pnpm run lint
pnpm run format
```

---

## Submitting a PR

1. Fork the repo and create a branch: `feature/<issue-number>-short-description`
2. Make your changes and ensure the app builds without errors
3. Run `pnpm run lint` and `pnpm run format`
4. Open a PR targeting the `dev` branch
5. Fill in the PR template and link the issue

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Freighter API](https://docs.freighter.app)
- [Stellar SDK (JavaScript)](https://stellar.github.io/js-stellar-sdk/)
