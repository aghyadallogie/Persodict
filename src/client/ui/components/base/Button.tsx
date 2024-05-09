import { FC, ReactNode } from 'react'
import styled from 'styled-components';

interface ComponentProps {
    children: ReactNode;
    onClick: () => {};
}

export const Button: FC<ComponentProps> = ({children, onClick}) => {
  return (
    <Wrapper onClick={onClick}>{children}</Wrapper>
  )
}

const Wrapper = styled.button`

`;