import React from "react";
import { StandardIcon } from "../styled";
import { IconProps } from "../types";

const ICON_DEFAULT = "#000000";

const DoubleUp = (props: IconProps) => {
  const { color } = props;
  const fillColor = color && color !== "" ? color : ICON_DEFAULT;
  return (
    <StandardIcon
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={fillColor}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 18.75 7.5-7.5 7.5 7.5"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 7.5-7.5 7.5 7.5"
      />
    </StandardIcon>
  );
};

export default DoubleUp;
