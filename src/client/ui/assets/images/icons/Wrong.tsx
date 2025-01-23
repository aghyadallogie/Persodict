import React from "react";

interface IconProps {
  className?: string;
  color?: string;
  height?: number | string;
  width?: number | string;
}

export const Wrong = React.forwardRef<SVGSVGElement, IconProps>(
  (props) => {
    const {
      className = "",
      color = "#0019A5",
      height = 24,
      width = 24,
    } = props;

    return (
      <svg className={className} fill={color} width={width} height={height} viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title /><path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Z" /><path d="M128.5,74a9.67,9.67,0,0,0-14,0L100,88.5l-14-14a9.9,9.9,0,0,0-14,14l14,14-14,14a9.9,9.9,0,0,0,14,14l14-14,14,14a9.9,9.9,0,0,0,14-14l-14-14,14-14A10.77,10.77,0,0,0,128.5,74Z" /></svg>
    );
  }
);

Wrong.displayName = "WrongIcon";