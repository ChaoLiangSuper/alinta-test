import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(5)};
`;

const Icon = styled.div`
  border-left: 2px solid black;
  border-right: 2px solid black;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} infinite 1s linear;
`;

const Loading: React.FC = () => (
  <Wrapper>
    <Icon />
  </Wrapper>
);

export default Loading;
