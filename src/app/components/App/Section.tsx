import styled from 'styled-components';

const Section = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};

  & + & {
    margin-top: 20px;
  }
`;

export default Section;
