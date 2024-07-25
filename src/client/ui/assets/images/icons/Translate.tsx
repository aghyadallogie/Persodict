import React from "react";

interface IconProps {
  className?: string;
  color?: string;
  height?: number | string;
  width?: number | string;
}

export const Translate = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const {
      className = "",
      color = "#0019A5",
      height = 24,
      width = 24,
    } = props;

    return (
      <svg
        className={className}
        width={width}
        height={height}
        fill={color}
        ref={ref}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11 21l1.5-3m8.5 3l-1.5-3m-7 0l3.5-7 3.5 7m-7 0h7M3 5h6m6 0h-2.5M3 18c3.167-1.667 9.5-6.6 9.5-13m0 0H9m2 9L7 9m2-4V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
);