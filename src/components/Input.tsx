import React from 'react';
import styled from 'styled-components';

interface StyledInputProp {
  invalid?: boolean;
}

interface InputProp extends StyledInputProp {
  name: string;
  label: string;
  date?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const StyledLabel = styled.label`
  display: flex;
  width: 100%;
`;

const StyledText = styled.span`
  flex-grow: 2;
  flex-basis: 0;
`;

const StyledInput = styled.input<StyledInputProp>`
  flex-grow: 3;
  flex-basis: 0;
  width: 100%;
  border: ${({ invalid }) => (invalid ? '1px solid red' : '1px solid grey')};
  border-radius: ${({ theme }) => theme.borderRadius()};
`;

const Input: React.FC<InputProp> = ({
  name,
  label,
  date,
  value,
  onChange,
  invalid,
}) => {
  return (
    <StyledLabel>
      <StyledText>{label}</StyledText>
      <StyledInput
        name={name}
        type={date ? 'date' : 'text'}
        value={value}
        invalid={invalid}
        onChange={({ target }) => onChange(target.value)}
      />
    </StyledLabel>
  );
};

export default Input;
