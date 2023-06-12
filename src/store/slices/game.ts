import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface GameState {
  isPlaying: boolean;
  startedDate: string | null;
}

const initialState: GameState = {
  isPlaying: false,
  startedDate: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
      state.startedDate = new Date().toISOString();
    },
    resetTime: state => {
      state.startedDate = null;
    },
  },
});

export const { setIsPlaying, resetTime } = gameSlice.actions;
export const gameSelector = (state: RootState) => state.gameReducer;

const gameReducer = gameSlice.reducer;
export default gameReducer;
