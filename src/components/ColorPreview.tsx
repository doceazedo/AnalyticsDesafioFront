import styled from "@emotion/styled";

type ColorPreviewProps = {
  color: string;
  started: boolean;
  handlePlayClick: () => void;
};

export const ColorPreview = (props: ColorPreviewProps) => (
  <ColorPreviewWrapper color={props.color}>
    {!props.started && (
      <PlayButton onClick={props.handlePlayClick}>Play</PlayButton>
    )}
  </ColorPreviewWrapper>
);

const ColorPreviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 20rem;
  background-color: ${(props) => props.color};
  border-radius: 1rem;
  transition: all 0.2s ease;
`;

const PlayButton = styled.button`
  background-color: #fff;
  border: 1px solid #dadfe5;
  border-radius: 0.375rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
`;
