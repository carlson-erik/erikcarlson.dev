import React from "react";
import { DevIcon, SocialIcon } from "../../styled";
import { IconProps } from "../../types";

const ICON_DEFAULT = "#EA2D2E";

const Rollup = (props: IconProps) => {
  const { color, type } = props;
  const fillColor = color && color !== "" ? color : ICON_DEFAULT;
  const Icon = type === "social" ? SocialIcon : DevIcon;
  return (
    <Icon role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path
        fill={fillColor}
        d="M4.563 0c-0.276 0-0.495 0.224-0.495 0.495v26.021c0.771-1.984 2.078-4.823 4.182-8.708 7.604-13.974 8.599-15.38 12.557-15.38 2.078 0 4.177 0.938 5.536 2.604-1.906-3.083-5.25-4.979-8.875-5.031zM21.521 3.391c-1.589 0.016-3.010 0.625-3.599 2-1.286 3.005 2.167 6.354 3.677 6.089 1.922-0.339-0.339-4.75-0.339-4.75 2.938 5.542 2.26 3.844-3.057 8.932-5.313 5.089-10.74 15.833-11.531 16.281-0.036 0.026-0.073 0.042-0.109 0.057h20.849c0.365-0.005 0.604-0.385 0.443-0.714l-5.453-10.792c-0.12-0.234-0.036-0.521 0.193-0.651 3.302-1.891 5.344-5.411 5.339-9.219 0-1.896-0.495-3.677-1.37-5.224-1.24-1.271-3.245-2.021-5.042-2.010z"
      />
    </Icon>
  );
};

export default Rollup;
