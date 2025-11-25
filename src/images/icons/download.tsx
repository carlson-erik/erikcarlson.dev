import React from "react";
import { StandardIcon } from "../styled";
import { IconProps } from "../types";

const ICON_DEFAULT = "#000000";

const Download = (props: IconProps) => {
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
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </StandardIcon>
  );
};

export default Download;
