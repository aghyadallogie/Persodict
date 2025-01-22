import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { P } from '@/client/ui/components/layout/Text';

interface TooltipProps {
    content: ReactNode;
    children: React.ReactNode;
    position?: 'top' | 'bottom';
    className?: string;
}

export const Tooltip = ({
    content,
    children,
    position = 'bottom',
    className
}: TooltipProps) => (
    <TooltipWrapper className={className}>
        {children}
        <TooltipContent
            $position={position}
            role="tooltip"
        >
            <P $size='tiny'>{content}</P>
        </TooltipContent>
    </TooltipWrapper>
);

const TooltipWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

const getTooltipPositionStyles = (position: 'top' | 'bottom') => {
    const positions = {
        top: css`
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(-10px);
        `,
        bottom: css`
            top: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(10px);
        `
    };
    return positions[position];
};

const TooltipContent = styled.div<{ $position: 'top' | 'bottom' }>`
    position: absolute;
    padding: 8px;
    background-color: ${({ theme }) => theme.colors.pageBackground};
    border: 1px solid ${({ theme }) => theme.colors.primaryAccentColor};
    border-radius: 4px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;
    white-space: nowrap;
    z-index: 1000;

    ${({ $position }) => getTooltipPositionStyles($position)}

    ${TooltipWrapper}:hover & {
        opacity: 1;
        pointer-events: auto;
        transform: translateX(-50%) translateY(0);
    }

    p {
        color: ${({ theme }) => theme.colors.primaryAccentFontColor};
    }
`;