import React from "react";

interface IconProps {
  className?: string;
  color?: string;
  height?: number | string;
  width?: number | string;
}

export const Check = React.forwardRef<SVGSVGElement, IconProps>(
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
        fill={color}
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={width}
        height={height}
        viewBox="0 0 305.002 305.002"
        xmlSpace="preserve"
      >
        <g>
          <g>
            <path d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5
			S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5
			c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z"/>
            <path d="M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678
			l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385
			c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z"/>
          </g>
        </g>
      </svg>
    );
  }
);

Check.displayName = "CheckIcon";