import styled from 'styled-components';

const Cell = styled.div<{ portion?: number }>`
  flex: ${({ portion = 1 }) => portion};
`;
export default Cell;
