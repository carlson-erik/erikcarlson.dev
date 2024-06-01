import { IconProps, AltIconProps } from "@/images/types";

type IconType = AltIconType | SimpleIconType;

interface BaseIcon {
  type: IconType;
  color?: string;
}

interface SimpleIcon extends BaseIcon {
  type: SimpleIconType;
}

interface AltIcon extends BaseIcon {
  type: AltIconType;
  useAlt?: boolean;
}

type AltIconType = "github" | "nodejs" | "react";

type SimpleIconType =
  | "css"
  | "d3"
  | "dev"
  | "gatsby"
  | "gmail"
  | "java"
  | "javascript"
  | "jest"
  | "nextjs"
  | "redux"
  | "rollup"
  | "typescript"
  | "webpack";

interface IconComponentProps {
  iconType: IconType;
  Component: (props: IconProps | AltIconProps) => JSX.Element;
}

const Icon = (props: IconComponentProps) => {
  const { iconType, Component } = props;
  return (
    <Component key={iconType} type="dev" />
  )
}

export default Icon;

export type {
  IconType,
  BaseIcon,
  SimpleIcon,
  AltIcon,
  AltIconType,
  SimpleIconType,
  IconComponentProps
}