import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface NewGame {
  playerName: string;
}
interface Record {
  score: number;
  playerName: string;
}

export interface GameState extends NewGame {
  isPlaying: boolean;
  startedDate: string | null;
  score: number;
  leaderboard: Record[];
}

const initialState: GameState = {
  isPlaying: false,
  startedDate: null,
  playerName: "",
  score: 0,
  leaderboard: [],
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
    setNewGame: (state, action: PayloadAction<NewGame>) => {
      state.isPlaying = true;
      state.startedDate = new Date().toISOString();
      state.playerName = action.payload.playerName;
    },
  },
});

export const { setIsPlaying, resetTime, setNewGame } = gameSlice.actions;
export const gameSelector = (state: RootState) => state.gameReducer;

const gameReducer = gameSlice.reducer;
export default gameReducer;
