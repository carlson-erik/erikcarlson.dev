import React from "react";
import { StandardIcon } from "../styled";
import { IconProps } from "../types";

const ICON_DEFAULT = "#000000";

const Night = (props: IconProps) => {
  const { color } = props;
  const fillColor = color && color !== "" ? color : ICON_DEFAULT;
  return (
    <StandardIcon
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={fillColor}
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </StandardIcon>
  );
};

export default Night;
