import styled from 'styled-components';

const Modal = styled.div`
  width: 30%;
  display: flex;
  background: white;
  box-shadow: 0 0 20px lightgray;
  border-radius: ${({ theme }) => theme.borderRadius(3)};
  padding: ${({ theme }) => theme.spacing(5)};
  flex-direction: column;
`;

export default Modal;
