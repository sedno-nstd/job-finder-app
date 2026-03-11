import React from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const JoobleLogo: React.FC<LogoProps> = ({
  className,
  height,
  width,
}) => {
  const joobleBlue = "#1A73E8";
  const joobleGreen = "#67bb5f";

  return (
    <a href="/">
      <svg
        width={width}
        height={height}
        viewBox="0 0 108 36"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <text
          x="0"
          y="28"
          style={{
            fontFamily: '"InterDisplay", "Helvetica", "Arial", sans-serif',
            fontWeight: 800,
            fontSize: "30px",
            letterSpacing: "0px",
          }}
        >
          <tspan fill={joobleBlue}>j</tspan>
          <tspan fill={joobleGreen}>o</tspan>
          <tspan fill={joobleGreen}>o</tspan>
          <tspan fill={joobleBlue}>b</tspan>
          <tspan fill={joobleBlue}>l</tspan>
          <tspan fill={joobleBlue}>e</tspan>
        </text>
      </svg>
    </a>
  );
};
