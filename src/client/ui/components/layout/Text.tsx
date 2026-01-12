import { shade } from '@/client/ui/utils';
import styled from "styled-components";

export type FontSize = 'large' | 'medium' | 'small' | 'tiny';

interface HProps {
    $isCentered?: boolean;
}

export const H1 = styled.h1<HProps>`
  color: ${({ theme }) => theme.colors.primaryFontColor};
  font-family: 'Lexend', sans-serif;
  font-size: 2.6rem;
  font-weight: normal;
  line-height: 3.4rem;
  text-align: ${({ $isCentered }) => $isCentered ? 'center' : 'left'};
  margin: 0;
`;

export const H2 = styled(H1)`
  font-size: 2rem;
  line-height: 3rem;
`;

interface PProps {
    $align?: 'center' | 'left' | 'right';
    $isLight?: boolean;
    $size?: FontSize;
    $clickable?: boolean;
    $underlined?: boolean;
}

interface GetSizeParams {
    $size?: FontSize;
}

export const getPSize = ({ $size }: GetSizeParams) => {
    switch ($size) {
        case 'large':
            return '1.6rem';
        case 'small':
            return '1.2rem';
        case 'tiny':
            return '.8rem';
        case 'medium':
        default:
            return '1.4rem';
    }
};

export const getPLineHeight = ({ $size }: GetSizeParams) => {
    switch ($size) {
        case 'large':
            return '2.4rem';
        case 'small':
            return '1.6rem';
        case 'tiny':
            return '1rem';
        case 'medium':
        default:
            return '2rem';
    }
};

/**
 * The P component is a styled paragraph (`<p>`) component.
 *
 * @param props          The props of the component.
 * @param props.theme    The theme of the component.
 * @param props.$align   Determines the horizontal alignment of the paragraph.
 * @param props.$isLight Determines whether the paragraph should be displayed in a light style.
 * @param props.$size    Determines the font size of the paragraph.
 * @returns              A React component.
 *
 * @example
 * ```tsx
 * <P $isLight={true} $align="center" $size="medium">
 *     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * </P>
 * ```
 */
export const P = styled.p<PProps>`
    color: ${({ $isLight, theme }) => ($isLight ? shade(theme.colors.primaryActionColor, 44, 'light') : null)};
    ${({ $underlined }) => $underlined && `
        text-decoration: underline;
    `}
    font-size: ${getPSize};
    line-height: ${getPLineHeight};
    margin: 0;
    padding: 0;
    text-align: ${({ $align }) => $align ?? 'inherit' as const};
    display: inline;
    cursor: ${({ $clickable }) => $clickable ? 'pointer' : 'default'};
`;
