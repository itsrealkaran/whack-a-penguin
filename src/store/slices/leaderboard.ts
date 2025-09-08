import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { blockchainService, LeaderboardEntry } from "@/services/blockchain";

export interface Record {
  score: number;
  playerName: string;
  player: string; // Wallet address
}

export interface LeaderboardState {
  leaderboard: Record[];
  isLoading: boolean;
  error: string | null;
  poolAmount: number;
  topPlayer: string;
}

const initialState: LeaderboardState = {
  leaderboard: [],
  isLoading: false,
  error: null,
  poolAmount: 0,
  topPlayer: '',
};

export const fetchRecords = createAsyncThunk(
  "leaderboard/fetchRecords",
  async () => {
    const response = await blockchainService.getDailyLeaderboard();
    return response;
  }
);

export const fetchGameStats = createAsyncThunk(
  "leaderboard/fetchGameStats",
  async () => {
    const response = await blockchainService.getGameStats();
    return response;
  }
);

export const playGame = createAsyncThunk(
  "leaderboard/playGame",
  async () => {
    const response = await blockchainService.play();
    return response;
  }
);

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: builder => {
    // Fetch records
    builder
      .addCase(fetchRecords.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        state.isLoading = false;
        // Convert LeaderboardEntry to Record format
        state.leaderboard = action.payload.map((entry: LeaderboardEntry) => ({
          score: entry.score,
          playerName: entry.player.slice(0, 6) + '...' + entry.player.slice(-4), // Truncated address
          player: entry.player
        }));
      })
      .addCase(fetchRecords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch leaderboard';
      });

    // Fetch game stats
    builder
      .addCase(fetchGameStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGameStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.poolAmount = action.payload.poolAmount;
        state.topPlayer = action.payload.topPlayer;
        // Update leaderboard if provided
        if (action.payload.dailyLeaderboard) {
          state.leaderboard = action.payload.dailyLeaderboard.map((entry: LeaderboardEntry) => ({
            score: entry.score,
            playerName: entry.player.slice(0, 6) + '...' + entry.player.slice(-4),
            player: entry.player
          }));
        }
      })
      .addCase(fetchGameStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch game stats';
      });

    // Play game
    builder
      .addCase(playGame.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(playGame.fulfilled, (state, action) => {
        state.isLoading = false;
        // Play successful, transaction ID returned
        console.log('Play transaction ID:', action.payload);
      })
      .addCase(playGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to play game';
      });
  },
});

export const { clearError, setLoading } = leaderboardSlice.actions;

export const leaderboardSelector = (state: RootState) =>
  state.leaderboardReducer;

const leaderboardReducer = leaderboardSlice.reducer;
export default leaderboardReducer;
