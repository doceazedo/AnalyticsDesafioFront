import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const roundDuration = 10;

const initialState = {
  started: false,
  currentColor: "#2fb344",
  colorOptions: ["#000000", "#000000", "#000000"],
  score: 0,
  highScore: parseInt(localStorage.getItem("HIGHSCORE") || "0"),
  timeRemaining: roundDuration,
  lastRoundPicks: JSON.parse(
    localStorage.getItem("HISTORY") || "[]"
  ) as string[],
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

      state.score += isCorrect ? 1 : -1;
      if (state.score < 0) state.score = 0;
      state.lastRoundPicks.push(pickedColor);
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
      localStorage.setItem("HIGHSCORE", highScore.toString());

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
  },
});

// Source: https://css-tricks.com/snippets/javascript/random-hex-color/#comment-83815
const getRandomColor = () => {
  const x = Math.round(0xffffff * Math.random()).toString(16);
  const y = 6 - x.length;
  const z = "000000";
  const z1 = z.substring(0, y);
  return "#" + z1 + x;
};

// Source: https://stackoverflow.com/a/2450976/10514863
const shuffle = <T>(array: T[]): T[] => {
  let currentIndex = array.length;
  let randomIndex: number;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

export type GameState = {
  game: typeof initialState;
};

export const {
  startGame,
  startNewRound,
  pickColor,
  decrementTime,
  failRound,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
