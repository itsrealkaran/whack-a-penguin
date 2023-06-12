import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface Record {
  score: number;
  playerName: string;
}

export interface LeaderboardState {
  leaderboard: Record[];
}

const initialState: LeaderboardState = {
  leaderboard: [],
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setNewRecord: (state, action: PayloadAction<Record>) => {
      state.leaderboard.push({
        playerName: action.payload.playerName,
        score: action.payload.score,
      });
    },
  },
});

export const { setNewRecord } = leaderboardSlice.actions;
export const leaderboardSelector = (state: RootState) =>
  state.leaderboardReducer;

const leaderboardReducer = leaderboardSlice.reducer;
export default leaderboardReducer;
