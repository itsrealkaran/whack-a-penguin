# Whack-a-Penguin Smart Contract

A blockchain-based whack-a-mole game built on Stacks with daily leaderboards and reward distribution.

## Contract Overview

This Clarity smart contract implements:
- **Payment System**: 1 STX per mole hit
- **Daily Leaderboard**: Tracks player scores per day
- **Reward Distribution**: 40% of daily pool goes to top scorer
- **Daily Reset**: Automatic reset of scores and pool

## Contract Functions

### Public Functions

#### `hit-mole`
- **Purpose**: Hit a mole and pay 1 STX
- **Cost**: 1 STX (transferred to contract)
- **Reward**: 10 points added to daily score
- **Events**: Emits `mole-hit` event

#### `submit-score`
- **Purpose**: Submit final score at end of game
- **Parameters**: `final-score` (uint)
- **Events**: Emits `mole-hit` event

#### `distribute-rewards`
- **Purpose**: Distribute 40% of pool to top scorer
- **Access**: Contract owner only
- **Events**: Emits `reward-distributed` event

#### `reset-daily-cycle`
- **Purpose**: Manually reset daily data
- **Access**: Contract owner only
- **Events**: Emits `daily-reset` event

### Read-Only Functions

#### `get-daily-leaderboard`
- **Purpose**: Get current player's daily score
- **Returns**: Player's score (uint)

#### `get-all-daily-scores`
- **Purpose**: Get all daily scores (for leaderboard display)
- **Returns**: Map of all player scores

#### `get-pool-amount`
- **Purpose**: Get current pool amount
- **Returns**: Pool amount in microSTX

#### `get-player-score`
- **Purpose**: Get specific player's daily score
- **Parameters**: `player` (principal)
- **Returns**: Player's score (uint)

#### `get-player-hits`
- **Purpose**: Get player's daily hit count
- **Parameters**: `player` (principal)
- **Returns**: Hit count (uint)

#### `get-top-player`
- **Purpose**: Get current top player
- **Returns**: Top player's principal

#### `get-game-stats`
- **Purpose**: Get overall game statistics
- **Returns**: Object with pool, hits, reset day, current day

## Events

- `mole-hit`: Emitted when a mole is hit
- `reward-distributed`: Emitted when rewards are distributed
- `daily-reset`: Emitted when daily cycle resets

## Constants

- `HIT_COST`: 1,000,000 microSTX (1 STX)
- `REWARD_PERCENTAGE`: 40% of pool goes to top scorer
- `CONTRACT_OWNER`: Contract deployer address

## Development

### Prerequisites
- [Clarinet](https://github.com/hirosystems/clarinet) installed
- Stacks testnet access

### Testing
```bash
clarinet test
```

### Deployment
```bash
clarinet deploy --network testnet
```

### Console Testing
```bash
clarinet console
```

## Integration

The contract integrates with the React frontend through:
- `hitMole()`: Called on each mole hit
- `submitScore()`: Called at game end
- `getDailyLeaderboard()`: Fetches leaderboard data
- `getPoolAmount()`: Shows current pool size

## Security Considerations

- Only contract owner can distribute rewards
- Only contract owner can reset daily cycle
- STX transfers are atomic (all-or-nothing)
- Player scores are tracked per principal (wallet address)
