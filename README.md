## Whack-a-Penguin (Stacks + React)

A fast, arcade-style whack-a-mole game themed as whack-a-penguin, built with React + Vite, Redux Toolkit, styled-components, and Stacks (Clarity smart contract + wallet integration). Play locally or connect your Stacks wallet to record plays on-chain and view blockchain-powered leaderboard and prize pool.

### Features
- Arcade gameplay with animated moles/penguins
- Score, lives, timer, and end-of-game screen
- Redux Toolkit state management and component tests
- Stacks wallet connect (testnet) with on-chain play and stats
- Daily on-chain leaderboard and prize pool display

### Tech Stack
- React + Vite + TypeScript
- Redux Toolkit + React Testing Library + Jest
- styled-components
- Stacks: Clarinet (contracts), Stacks Connect (wallet), @stacks/transactions

---

## Getting Started

### Prerequisites
- Node 18+ and pnpm or npm
- Optional (on-chain features): Stacks wallet (e.g., Hiro Wallet) on testnet

### Install
```bash
pnpm install
# or
npm install
```

### Run Dev Server
```bash
pnpm dev
# or
npm run dev
```
App runs at http://localhost:5173 (Vite default).

### Build
```bash
pnpm build
# or
npm run build
```

### Test
```bash
pnpm test
# or
npm test
```

---

## Project Structure
Key folders:
- `src/components` UI components (Battlefield, Mole, Lives, FinalScore, etc.)
- `src/store` Redux slices (`game`, `leaderboard`) and store hooks
- `src/contexts/StacksContext.tsx` Wallet connection and Stacks network context
- `src/services/blockchain.ts` Frontend service calling on-chain read/write
- `whack-a-penguin-contract` Clarinet project with Clarity contract and tests

---

## Environment & Configuration
On-chain features use Stacks testnet. After deploying your contract (see below), set the contract identifiers in `src/services/blockchain.ts` as instructed in `DEPLOYMENT.md`.

If needed, create `.env` for Vite (optional):
```
VITE_STACKS_NETWORK=testnet
```

---

## Gameplay Notes
- Click a penguin to score; clicking empty holes costs a life.
- When connected, a play triggers an on-chain call (and stats refresh).
- End screen shows your final score, prize pool, and your rank (if connected) with quick links to play again or view leaderboard.

---

## Smart Contract (Clarity) and Deployment
See `DEPLOYMENT.md` for step-by-step contract testing and deployment with Clarinet, including:
- Local testing with `clarinet test` and `clarinet console`
- Deploying to testnet
- Updating frontend constants (contract address)
- Contract read-only and public functions overview

Quick reference (from `DEPLOYMENT.md`):
```bash
clarinet test
clarinet console
clarinet deploy --network testnet
```

---

## Git Remotes
To set or update the upstream remote to your GitHub repo:
```bash
git remote add upstream https://github.com/itsrealkaran/whack-a-penguin.git
# or if it exists already
git remote set-url upstream https://github.com/itsrealkaran/whack-a-penguin.git
git remote -v
```

Upstream repository link: `https://github.com/itsrealkaran/whack-a-penguin.git`.

---

## Troubleshooting
- Wallet not detected: ensure a Stacks-compatible wallet is installed and set to testnet.
- On-chain calls failing: verify contract deployed on testnet and frontend contract IDs updated.
- UI tests failing: run `pnpm test` and check recent component edits; ensure providers (Redux, Router) are wrapped (see `src/test-utils`).

---

## License
MIT. See `LICENSE` if provided.


