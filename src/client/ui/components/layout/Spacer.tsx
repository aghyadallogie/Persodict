import styled from "styled-components";

/**
 * Spacer – vertical rhythm helper.
 *
 * Renders an empty div with a fixed rem height.
 * Defaults to 1rem when no height is supplied.
 *
 * @example
 * <Spacer />        // 1rem gap
 * <Spacer height={2} /> // 2rem gap
 */
export const Spacer = styled.div<{ height?: number }>`
  height: ${({ height }) => (height ? `${height}rem` : "1rem")};
`;
