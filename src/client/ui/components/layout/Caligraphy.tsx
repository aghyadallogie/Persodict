import styled from "styled-components";

export const H1 = styled.h1`
  color: ${({ theme }) => theme.colors.primaryFontColor};
  font-family: 'Lexend', sans-serif;
  font-size: 2.6rem;
  font-weight: normal;
  line-height: 3.4rem;
`;

export const H2 = styled(H1)`
  font-size: 2rem;
  line-height: 3rem;
`;