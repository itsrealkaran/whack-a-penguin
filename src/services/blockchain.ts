import { 
  fetchCallReadOnlyFunction, 
  makeContractCall,
  PostConditionMode,
  AnchorMode,
  standardPrincipalCV,
  uintCV,
  stringUtf8CV
} from '@stacks/transactions';
import { STACKS_TESTNET } from '@stacks/network';

// Contract configuration - will be updated when we deploy
const CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'; // Placeholder
const CONTRACT_NAME = 'whack-a-penguin';
const NETWORK = STACKS_TESTNET;

export interface LeaderboardEntry {
  player: string;
  score: number;
}

export interface GameStats {
  poolAmount: number;
  dailyLeaderboard: LeaderboardEntry[];
  topPlayer: string;
  lastResetDay: number;
}

export class BlockchainService {
  private network = NETWORK;
  private contractAddress = CONTRACT_ADDRESS;
  private contractName = CONTRACT_NAME;

  // Hit a mole - deduct payment and update score
  async hitMole(userSession: any): Promise<string> {
    const options = {
      contractAddress: this.contractAddress,
      contractName: this.contractName,
      functionName: 'hit-mole',
      functionArgs: [],
      network: this.network,
      postConditionMode: PostConditionMode.Allow,
      anchorMode: AnchorMode.Any,
      onFinish: (data: any) => {
        console.log('Hit mole transaction:', data.txId);
      },
    };

    return new Promise((resolve, reject) => {
      makeContractCall({
        ...options,
        onFinish: (data: any) => {
          console.log('Hit mole transaction:', data.txId);
          resolve(data.txId);
        },
        onCancel: () => {
          reject(new Error('Transaction cancelled'));
        },
      });
    });
  }

  // Get daily leaderboard
  async getDailyLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      const result = await fetchCallReadOnlyFunction({
        contractAddress: this.contractAddress,
        contractName: this.contractName,
        functionName: 'get-daily-leaderboard',
        functionArgs: [],
        senderAddress: this.contractAddress, // Can be any valid address for read-only
        network: this.network,
      });

      // Parse the result - this will depend on how we structure the contract
      return result.value || [];
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  }

  // Get current pool amount
  async getPoolAmount(): Promise<number> {
    try {
      const result = await fetchCallReadOnlyFunction({
        contractAddress: this.contractAddress,
        contractName: this.contractName,
        functionName: 'get-pool-amount',
        functionArgs: [],
        senderAddress: this.contractAddress,
        network: this.network,
      });

      return result.value || 0;
    } catch (error) {
      console.error('Error fetching pool amount:', error);
      return 0;
    }
  }

  // Get game stats
  async getGameStats(): Promise<GameStats> {
    try {
      const [poolAmount, leaderboard] = await Promise.all([
        this.getPoolAmount(),
        this.getDailyLeaderboard()
      ]);

      const topPlayer = leaderboard.length > 0 ? leaderboard[0].player : '';
      
      return {
        poolAmount,
        dailyLeaderboard: leaderboard,
        topPlayer,
        lastResetDay: 0 // Will be implemented in contract
      };
    } catch (error) {
      console.error('Error fetching game stats:', error);
      return {
        poolAmount: 0,
        dailyLeaderboard: [],
        topPlayer: '',
        lastResetDay: 0
      };
    }
  }

  // Submit final score (for end of game)
  async submitScore(userSession: any, score: number): Promise<string> {
    const options = {
      contractAddress: this.contractAddress,
      contractName: this.contractName,
      functionName: 'submit-score',
      functionArgs: [uintCV(score)],
      network: this.network,
      postConditionMode: PostConditionMode.Allow,
      anchorMode: AnchorMode.Any,
    };

    return new Promise((resolve, reject) => {
      makeContractCall({
        ...options,
        onFinish: (data: any) => {
          console.log('Submit score transaction:', data.txId);
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
