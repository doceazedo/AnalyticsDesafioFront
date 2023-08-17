import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { State } from "../redux/reducers";

export const Sidebar = () => {
  const { lastRoundPicks } = useSelector((state: State) => state.game);

  return (
    <SidebarWrapper>
      <Title>Current/Latest game</Title>
      <ul>
        {lastRoundPicks.map((round, i) => (
          <li key={i}>
            <pre>{JSON.stringify(round, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;
  width: 24rem;
  padding: 1.5rem;
  background-color: #fff;
  border-right: 1px solid #dadfe5;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
`;
