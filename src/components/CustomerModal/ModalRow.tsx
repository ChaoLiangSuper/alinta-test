import styled from 'styled-components';

interface ModalRowProps {
  center?: boolean;
}

const ModalRow = styled.div<ModalRowProps>`
  width: 100%;
  display: flex;
  justify-content: ${({ center }) => (center ? 'center' : '')};

  & + & {
    margin-top: ${({ theme }) => theme.spacing()};
  }
`;

export default ModalRow;
