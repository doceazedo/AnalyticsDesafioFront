import styled from "@emotion/styled";

type GameDataProps = {
  started: boolean;
  timeRemaining: number;
  score: number;
  highScore: number;
  handleReset: () => void;
};

export const GameData = (props: GameDataProps) => (
  <Cards>
    <Card>
      <span>Time left</span>
      {props.timeRemaining}
    </Card>
    <RestartButton onClick={props.handleReset} disabled={!props.started}>
      Restart
    </RestartButton>
    <Scores>
      <Score>
        <span>High score</span> {props.highScore}
      </Score>
      <Score>
        <span>Score</span> {props.score}
      </Score>
    </Scores>
  </Cards>
);

const Cards = styled.div`
  display: flex;
  width: 20rem;
  background-color: #fff;
  border: 1px solid #dadfe5;
  border-radius: 0.375rem;

  > *:not(:last-child) {
    border-right: 1px solid #dadfe5;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  font-size: 1.2rem;

  span {
    font-size: 0.8rem;
    font-weight: 400;
  }
`;

const RestartButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: none;
  background: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Scores = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Score = styled(Card)`
  flex-direction: row;
  justify-content: space-between;
  padding: 0.25rem 0.5rem;

  &:not(:last-child) {
    border-bottom: 1px solid #dadfe5;
  }
`;
