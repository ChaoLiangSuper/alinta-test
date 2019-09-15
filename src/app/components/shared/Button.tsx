import styled from 'styled-components';

interface ButtonProps {
  primary?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  border: none;
  padding: ${({ theme }) => theme.spacing()};
  border-radius: ${({ theme }) => theme.borderRadius()};
  background: ${({ theme, primary }) =>
    primary ? theme.primaryColor : theme.secondaryColor};
  color: ${({ theme, primary }) =>
    primary ? theme.primaryText : theme.secondaryText};

  &:active {
    background-color: ${({ theme, primary }) =>
      primary ? theme.primaryColorDark : theme.secondaryColorDark};
  }

  & + & {
    margin-left: ${({ theme }) => theme.spacing()};
  }
`;

export default StyledButton;
