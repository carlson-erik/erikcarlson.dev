type HexColor = `#${string}`;

type PrimaryPalette = {
  shade50: HexColor;
  shade100: HexColor;
  shade200: HexColor;
  shade300: HexColor;
  shade400: HexColor;
  shadeDefault: HexColor;
  shade600: HexColor;
  shade700: HexColor;
  shade800: HexColor;
  shade900: HexColor;
};

type GrayPalette = {
  shade100: HexColor;
  shade200: HexColor;
  shade300: HexColor;
  shade400: HexColor;
  shade500: HexColor;
  shade600: HexColor;
  shade700: HexColor;
  shade800: HexColor;
  shade900: HexColor;
};

type DesignSystem = {
  colors: {
    primary: PrimaryPalette;
    grays: GrayPalette;
  };
  font: {
    weights: {
      regular: number;
      semibold: number;
      bold: number;
    };
  };
};

const designSystem: DesignSystem = {
  colors: {
    primary: {
      shade50: "#E8F0FF",
      shade100: "#D1E1FF",
      shade200: "#A3C3FF",
      shade300: "#75A5FF",
      shade400: "#4787FF",
      shadeDefault: "#1f5aff",
      shade600: "#1A4BCC",
      shade700: "#143C99",
      shade800: "#0F2D66",
      shade900: "#0A1E33",
    },
    grays: {
      shade100: "#F8F9FA",
      shade200: "#EFF2F4",
      shade300: "#E5E8EC",
      shade400: "#D1D4D9",
      shade500: "#A9AEB7",
      shade600: "#7C818B",
      shade700: "#52555F",
      shade800: "#343740",
      shade900: "#1E2127",
    },
  },
  font: {
    weights: {
      regular: 400,
      semibold: 600,
      bold: 700,
    },
  },
};

export default designSystem;
