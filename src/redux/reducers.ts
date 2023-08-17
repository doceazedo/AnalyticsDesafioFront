import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getRandomColor } from "../utils/get-random-color";
import { shuffle } from "../utils/shuffle";

export type GameState = {
  started: boolean;
  currentColor: string;
  colorOptions: string[];
  score: number;
  highScore: number;
  timeRemaining: number;
  lastRoundPicks: {
    pick: string;
    answer: string;
    score: number;
  }[];
};

export type State = {
  game: GameState;
};

export const roundDuration = 10;

const initialState: GameState = {
  started: false,
  currentColor: "#2fb344",
  colorOptions: ["#000000", "#000000", "#000000"],
  score: 0,
  highScore: parseInt(localStorage.getItem("HIGHSCORE") || "0"),
  timeRemaining: roundDuration,
  lastRoundPicks: JSON.parse(localStorage.getItem("HISTORY") || "[]"),
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state) => {
      state.started = true;
      state.lastRoundPicks = [];
    },
    startNewRound: (state) => {
      state.currentColor = getRandomColor();
      state.colorOptions = shuffle([
        state.currentColor,
        getRandomColor(),
        getRandomColor(),
      ]);
      state.timeRemaining = roundDuration;
    },
    pickColor: (state, action: PayloadAction<string>) => {
      const correctColor = state.currentColor;
      const pickedColor = action.payload;
      const isCorrect = correctColor == pickedColor;
      const score = isCorrect ? 5 : -1;

      state.score += score;
      if (state.score < 0) state.score = 0;
      state.lastRoundPicks.push({
        pick: pickedColor,
        answer: correctColor,
        score,
      });
    },
    decrementTime: (state) => {
      if (state.timeRemaining > 0) state.timeRemaining -= 1;
    },
    failRound: (state) => {
      state.score -= 2;
      if (state.score < 0) state.score = 0;
    },
    resetGame: (state) => {
      const highScore =
        state.score > state.highScore ? state.score : state.highScore;

      return {
        ...initialState,
        // Keep useful last round data that will be
        // overwritten when a new game starts anyways
        currentColor: state.currentColor,
        lastRoundPicks: state.lastRoundPicks,
        score: state.score,
        highScore,
      };
    },
    resetData: () => {
      localStorage.removeItem("HIGHSCORE");
      localStorage.removeItem("HISTORY");
      return initialState;
    },
  },
});

export const {
  startGame,
  startNewRound,
  pickColor,
  decrementTime,
  failRound,
  resetGame,
  resetData,
} = gameSlice.actions;

export default gameSlice.reducer;
