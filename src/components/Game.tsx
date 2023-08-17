import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  startGame,
  startNewRound,
  pickColor,
  decrementTime,
  resetGame,
  State,
  roundDuration,
  resetData,
} from "../redux/reducers";
import { GameData } from "./GameData";
import { Options } from "./Options";
import { Progress } from "./Progress";
import { ColorPreview } from "./ColorPreview";
import { useEffect } from "react";

export const Game = () => {
  const dispatch = useDispatch();
  const {
    currentColor,
    colorOptions,
    score,
    highScore,
    started,
    timeRemaining,
  } = useSelector((state: State) => state.game);

  useEffect(() => {
    if (!started) return;
    if (timeRemaining > 0) {
      const interval = setInterval(() => dispatch(decrementTime()), 1000);
      return () => clearInterval(interval);
    }

    // Ignoring this for now as it takes away 2 points
    // AND the game ends. This feels very weird as the
    // player sees they have, let's say, 5 points, and
    // the game ends with them having only 3.
    //
    // dispatch(failRound());

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
  const handleResetGame = () => dispatch(resetGame());
  const handleResetData = () => dispatch(resetData());

  return (
    <GameWrapper>
      <Title>Guess the Color</Title>
      <GameData
        started={started}
        timeRemaining={timeRemaining}
        score={score}
        highScore={highScore}
        handleResetGame={handleResetGame}
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
      <ResetDataButton onClick={handleResetData}>
        Reset all data
      </ResetDataButton>
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

  @media screen and (max-width: 768px) {
    height: 100vh;
  }
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
