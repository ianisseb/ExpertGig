import React from "react";

function SkillLinkLogo({ fillColor }) {
  return (
    <svg
      width="200"
      height="50"
      viewBox="0 0 200 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={fillColor}>
        <text x="10" y="35" font-family="Arial" font-size="30" fill={fillColor}>
          Skill Link
        </text>
      </g>
    </svg>
  );
}

export default SkillLinkLogo;
