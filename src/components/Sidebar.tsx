import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { State } from "../redux/reducers";
import { CheckCircle2, XCircle } from "lucide-react";
import { getTextColor } from "../utils/get-text-color";

export const Sidebar = () => {
  const { lastRoundPicks, started } = useSelector((state: State) => state.game);

  return (
    <SidebarWrapper>
      <Title>{started ? "Current" : "Latest"} game</Title>
      <History>
        <HistoryHeader>
          <span>Your guess</span>
          <span>Answer</span>
          <span>Score</span>
        </HistoryHeader>
        <Answers>
          {lastRoundPicks.map((round, i) => (
            <Answer key={i}>
              <Colors>
                <Color color={round.pick}>{round.pick}</Color>
                {round.pick != round.answer && (
                  <Color color={round.answer}>{round.answer}</Color>
                )}
              </Colors>
              <Score>
                {round.pick == round.answer ? (
                  <CheckCircle2 color="#2fb344" />
                ) : (
                  <XCircle color="#d63939" />
                )}
                {round.score}
              </Score>
            </Answer>
          ))}
        </Answers>
      </History>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 24rem;
  background-color: #fff;
  border-right: 1px solid #dadfe5;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  padding: 1.5rem;
`;

const History = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  height: 100%;
  padding: 0 1.5rem 1.5rem;
  overflow: auto;
`;

const HistoryHeader = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;

  span {
    width: 100%;
    font-size: 0.8rem;
    font-weight: 400;
  }
`;

const Answers = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const Answer = styled.li`
  display: flex;
  gap: 0.75rem;
  width: 100%;
`;

const Colors = styled.ul`
  display: flex;
  gap: 0.75rem;
  width: calc(100% / 3 * 2);
`;

const Color = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2.5rem;
  font-size: 0.8rem;
  background-color: ${(props) => props.color};
  color: ${(props) => getTextColor(props.color)};
  border-radius: 0.375rem;
`;

const Score = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
