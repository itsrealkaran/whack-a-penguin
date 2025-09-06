# Deployment Guide

## Prerequisites

1. **Install Clarinet**
   ```bash
   # On macOS
   brew install clarinet
   
   # On Linux/Windows
   # Download from: https://github.com/hirosystems/clarinet/releases
   ```

2. **Install Deno** (for testing)
   ```bash
   # On macOS
   brew install deno
   
   # On Linux/Windows
   # Download from: https://deno.land/install
   ```

## Contract Development

### 1. Test the Contract Locally
```bash
# Run tests
clarinet test

# Start console for manual testing
clarinet console
```

### 2. Deploy to Testnet
```bash
# Deploy to Stacks testnet
clarinet deploy --network testnet
```

### 3. Update Frontend
After deployment, update the contract address in `src/services/blockchain.ts`:

```typescript
const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';
```

## Contract Functions

### Public Functions (require wallet signature)
- `hit-mole` - Hit a mole and pay 1 STX
- `submit-score` - Submit final score
- `distribute-rewards` - Distribute rewards (owner only)
- `reset-daily-cycle` - Reset daily data (owner only)

### Read-Only Functions (no signature required)
- `get-daily-leaderboard` - Get current player's score
- `get-all-daily-scores` - Get all daily scores
- `get-pool-amount` - Get current pool amount
- `get-player-score` - Get specific player's score
- `get-player-hits` - Get player's hit count
- `get-top-player` - Get current top player
- `get-game-stats` - Get overall game statistics

## Testing the Contract

### Console Testing
```bash
clarinet console
```

In the console:
```clarity
# Hit a mole
(contract-call? .whack-a-penguin hit-mole)

# Get pool amount
(contract-call? .whack-a-penguin get-pool-amount)

# Get player score
(contract-call? .whack-a-penguin get-player-score tx-sender)
```

### Frontend Integration
The contract integrates with the React frontend through the `BlockchainService` class:

```typescript
import { blockchainService } from './services/blockchain';

// Hit a mole
await blockchainService.hitMole();

// Get leaderboard
const leaderboard = await blockchainService.getDailyLeaderboard();

// Get pool amount
const pool = await blockchainService.getPoolAmount();
```

## Security Notes

- Only the contract owner can distribute rewards
- Only the contract owner can reset the daily cycle
- STX transfers are atomic (all-or-nothing)
- Player scores are tracked per principal (wallet address)

## Troubleshooting

### Common Issues

1. **Contract deployment fails**
   - Check that you have testnet STX
   - Verify Clarinet configuration

2. **Frontend can't connect to contract**
   - Verify contract address is correct
   - Check that contract is deployed on testnet
   - Ensure network configuration matches

3. **Transactions fail**
   - Check wallet has sufficient STX
   - Verify contract function names match
   - Check transaction parameters

### Getting Help

- [Stacks Documentation](https://docs.stacks.co/)
- [Clarity Language Reference](https://docs.stacks.co/write-smart-contracts/clarity-language)
- [Clarinet GitHub](https://github.com/hirosystems/clarinet)
