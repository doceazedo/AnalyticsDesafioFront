import styled from "@emotion/styled";

type ProgressProps = {
  color: string;
  progress: number;
};

export const Progress = styled.div<ProgressProps>`
  position: relative;
  width: 20rem;
  height: 0.5rem;
  background-color: #dadfe5;
  border-radius: 1rem;

  &::before {
    content: "";
    display: flex;
    width: ${(props) => props.progress}%;
    height: 100%;
    background-color: ${(props) => props.color};
    border-radius: 1rem;
    transition: width 1s linear, background-color 0.2s ease;
  }
`;
