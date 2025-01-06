import styled from 'styled-components'
import { P } from '@/client/ui/components/layout/Text';

export const Footer = () => (
    <Wrapper>
        <P $size='small' $isLight>Made in Berlin With love by Aghy</P>
    </Wrapper>
)

const Wrapper = styled.footer`
    border-top: 1px solid ${({ theme }) => theme.colors.primaryActionColor};
    bottom: 0;
    margin-top: auto;
    position: fixed;
    width: 100%;
`;