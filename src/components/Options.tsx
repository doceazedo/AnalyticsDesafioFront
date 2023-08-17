import styled from "@emotion/styled";

type OptionsProps = {
  options: string[];
  handlePick: (color: string) => void;
};

export const Options = (props: OptionsProps) => (
  <OptionsWrapper>
    {props.options.map((color, i) => (
      <Option key={i} onClick={() => props.handlePick(color)} color={color}>
        {color}
      </Option>
    ))}
  </OptionsWrapper>
);

const OptionsWrapper = styled.div`
  display: flex;
  width: 20rem;
  gap: 0.75rem;
`;

const Option = styled.button`
  width: 100%;
  background-color: #fff;
  border: 1px solid ${(props) => props.color}; // FIXME: Debug, remove me later!!
  border-radius: 0.375rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
`;
