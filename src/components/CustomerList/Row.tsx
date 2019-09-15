import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: ${({ theme }) => theme.spacing(2)};

  &:hover {
    background: ${({ theme }) => theme.background};
  }
`;

export default Row;
