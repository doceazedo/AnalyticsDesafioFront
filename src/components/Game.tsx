import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  startGame,
  startNewRound,
  pickColor,
  decrementTime,
  resetGame,
  GameState,
  failRound,
  roundDuration,
} from "../redux/reducers";
import { GameData } from "./GameData";
import { Options } from "./Options";
import { Progress } from "./Progress";
import { ColorPreview } from "./ColorPreview";
import { useEffect } from "react";

export const Game = () => {
  const dispatch = useDispatch();
  const { currentColor, colorOptions, score, started, timeRemaining } =
    useSelector((state: GameState) => state.game);

  useEffect(() => {
    if (!started) return;
    if (timeRemaining > 0) {
      const interval = setInterval(() => dispatch(decrementTime()), 1000);
      return () => clearInterval(interval);
    }
    dispatch(failRound());
    dispatch(resetGame());
  }, [started, timeRemaining, dispatch]);

  const handlePlayClick = () => {
    dispatch(startGame());
    dispatch(startNewRound());
  };
  const handleColorPick = (pickedColor: string) => {
    dispatch(pickColor(pickedColor));
    dispatch(startNewRound());
  };
  const handleReset = () => dispatch(resetGame());

  return (
    <GameWrapper>
      <Title>Guess the Color</Title>
      <GameData
        started={started}
        timeRemaining={timeRemaining}
        score={score}
        handleReset={handleReset}
      />
      <Progress
        color={currentColor}
        progress={started ? (timeRemaining / roundDuration) * 100 - 10 : 100}
      />
      <ColorPreview
        color={currentColor}
        handlePlayClick={handlePlayClick}
        started={started}
      />
      {started && (
        <Options options={colorOptions} handlePick={handleColorPick} />
      )}
      <ResetDataButton>Reset all data</ResetDataButton>
    </GameWrapper>
  );
};

const GameWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 900;
`;

const ResetDataButton = styled.button`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  padding: 0;
  border: none;
  background: none;
  text-decoration: underline;
  cursor: pointer;
`;
