import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { BlockchainService } from "@/services/blockchain";

export interface Record {
  score: number;
  playerName: string;
}

export interface LeaderboardState {
  leaderboard: Record[];
}

const initialState: LeaderboardState = {
  leaderboard: [],
};

export const fetchRecords = createAsyncThunk(
  "leaderboard/fetchRecords",
  async () => {
    const response = await BlockchainService.getDailyLeaderboard();
    return response;
  }
);

export const addRecord = createAsyncThunk(
  "leaderboard/addRecord",
  async (record: Record) => {
    const response = await BlockchainService.submitScore(record.score);
    return response.data;
  }
);

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRecords.fulfilled, (state, action) => {
      state.leaderboard = action.payload;
    });
  },
});

export const leaderboardSelector = (state: RootState) =>
  state.leaderboardReducer;

const leaderboardReducer = leaderboardSlice.reducer;
export default leaderboardReducer;
