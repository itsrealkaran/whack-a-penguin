import { 
  fetchCallReadOnlyFunction, 
  PostConditionMode,
  AnchorMode,
  uintCV,
  cvToValue
} from '@stacks/transactions';
import { openContractCall } from '@stacks/connect';
import { STACKS_TESTNET } from '@stacks/network';

// Contract configuration - will be updated when we deploy
const CONTRACT_ADDRESS = 'ST1SE0FXZ5A8KX9KWWGF52C7559TBSNYS5JZBEAE9'; // Placeholder
const CONTRACT_NAME = 'whack-a-penguin';
const NETWORK = STACKS_TESTNET;

export interface LeaderboardEntry {
  player: string;
  score: number;
  rank?: number;
}

export interface GameStats {
  poolAmount: number;
  dailyLeaderboard: LeaderboardEntry[];
  topPlayer: string;
  currentDay: number;
}

export interface PlayResult {
  newScore: number;
  newPool: number;
}

export class BlockchainService {
  private network = NETWORK;
  private contractAddress = CONTRACT_ADDRESS;
  private contractName = CONTRACT_NAME;

  // Update contract address after deployment
  updateContractAddress(address: string) {
    this.contractAddress = address;
  }

  // Play the game - hit a mole, deduct payment and update score
  async play(): Promise<string> {
    const options = {
      contractAddress: this.contractAddress,
      contractName: this.contractName,
      functionName: 'play',
      functionArgs: [],
      network: this.network,
      postConditionMode: PostConditionMode.Allow,
      anchorMode: AnchorMode.Any,
    };

    return new Promise((resolve, reject) => {
      openContractCall({
        ...options,
        onFinish: (data: any) => {
          console.log('Play transaction:', data.txId);
          resolve(data.txId);
        },
        onCancel: () => {
          reject(new Error('Transaction cancelled'));
        },
      });
    });
  }

  // Get current day
  async getCurrentDay(): Promise<number> {
    try {
      const result = await fetchCallReadOnlyFunction({
        contractAddress: this.contractAddress,
        contractName: this.contractName,
        functionName: 'get-current-day',
        functionArgs: [],
        senderAddress: this.contractAddress,
        network: this.network,
      });

      const parsedResult = cvToValue(result);
      return typeof parsedResult === 'number' ? parsedResult : 0;
    } catch (error) {
      console.error('Error fetching current day:', error);
      return 0;
    }
  }

  // Get daily leaderboard for a specific day
  async getDailyLeaderboard(day?: number): Promise<LeaderboardEntry[]> {
    try {
      const currentDay = day !== undefined ? day : await this.getCurrentDay();
      
      // If it's day 0, return empty leaderboard as contract might not have data
      if (currentDay === 0) {
        console.log('Day 0 detected, returning empty leaderboard');
        return [];
      }

      const result = await fetchCallReadOnlyFunction({
        contractAddress: this.contractAddress,
        contractName: this.contractName,
        functionName: 'get-daily-stats',
        functionArgs: [uintCV(currentDay)],
        senderAddress: this.contractAddress,
        network: this.network,
      });

      const parsedResult = cvToValue(result);
      console.log('Raw leaderboard data for day', currentDay, ':', parsedResult);
      
      // Handle the contract's response structure
      if (parsedResult && parsedResult.leaderboard && Array.isArray(parsedResult.leaderboard)) {
        return parsedResult.leaderboard
          .filter((entry: any) => entry !== null && entry !== undefined && entry.player)
          .map((entry: any, index: number) => ({
            player: String(entry.player),
            score: Number(entry.score) || 0,
            rank: index + 1
          }));
      }
      
      // If the result is directly an array
      if (Array.isArray(parsedResult)) {
        return parsedResult
          .filter((entry: any) => entry !== null && entry !== undefined && entry.player)
          .map((entry: any, index: number) => ({
            player: String(entry.player),
            score: Number(entry.score) || 0,
            rank: index + 1
          }));
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching leaderboard for day', day, ':', error);
      return [];
    }
  }

  // Get current pool amount for a specific day
  async getPoolAmount(day?: number): Promise<number> {
    try {
      const currentDay = day !== undefined ? day : await this.getCurrentDay();
      
      // Return 0 for day 0 as contract might not have data
      if (currentDay === 0) {
        console.log('Day 0 detected, returning 0 pool amount');
        return 0;
      }

      const result = await fetchCallReadOnlyFunction({
        contractAddress: this.contractAddress,
        contractName: this.contractName,
        functionName: 'get-daily-stats',
        functionArgs: [uintCV(currentDay)],
        senderAddress: this.contractAddress,
        network: this.network,
      });

      const parsedResult = cvToValue(result);
      console.log('Raw pool data for day', currentDay, ':', parsedResult);
      
      // Try different possible data structures
      if (parsedResult?.pool !== undefined) {
        return Number(parsedResult.pool) || 0;
      }
      
      if (typeof parsedResult === 'number') {
        return parsedResult;
      }
      
      return 0;
    } catch (error) {
      console.error('Error fetching pool amount for day', day, ':', error);
      return 0;
    }
  }

  // Get game stats
  async getGameStats(): Promise<GameStats> {
    try {
      const [poolAmount, leaderboard, currentDay] = await Promise.all([
        this.getPoolAmount(),
        this.getDailyLeaderboard(),
        this.getCurrentDay()
      ]);

      const topPlayer = leaderboard.length > 0 ? leaderboard[0].player : '';
      
      return {
        poolAmount,
        dailyLeaderboard: leaderboard,
        topPlayer,
        currentDay
      };
    } catch (error) {
      console.error('Error fetching game stats:', error);
      return {
        poolAmount: 0,
        dailyLeaderboard: [],
        topPlayer: '',
        currentDay: 0
      };
    }
  }

  // Distribute reward for a specific day (admin function)
  async distributeReward(day: number): Promise<string> {
    const options = {
      contractAddress: this.contractAddress,
      contractName: this.contractName,
      functionName: 'distribute-reward',
      functionArgs: [uintCV(day)],
      network: this.network,
      postConditionMode: PostConditionMode.Allow,
      anchorMode: AnchorMode.Any,
    };

    return new Promise((resolve, reject) => {
      openContractCall({
        ...options,
        onFinish: (data: any) => {
          console.log('Distribute reward transaction:', data.txId);
          resolve(data.txId);
        },
        onCancel: () => {
          reject(new Error('Transaction cancelled'));
        },
      });
    });
  }

  // Increment day (for testing purposes)
  async incrementDay(): Promise<string> {
    const options = {
      contractAddress: this.contractAddress,
      contractName: this.contractName,
      functionName: 'increment-day',
      functionArgs: [],
      network: this.network,
      postConditionMode: PostConditionMode.Allow,
      anchorMode: AnchorMode.Any,
    };

    return new Promise((resolve, reject) => {
      openContractCall({
        ...options,
        onFinish: (data: any) => {
          console.log('Increment day transaction:', data.txId);
          resolve(data.txId);
        },
        onCancel: () => {
          reject(new Error('Transaction cancelled'));
        },
      });
    });
  }
}

export const blockchainService = new BlockchainService();
