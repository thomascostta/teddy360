const palette = {
  white: "#FFFFFF",
  black: "#000000",
  background: "#20202066",
  gray_dark: "rgba(32, 32, 32, 0.4)",
  orange_primary: "#F19467",
  white_secondary: "#D5D5D5",
  orange_secondary: "#EB6625",
  orange_third: "#F09163",
  red_primary: "#CE4646",
  red_secondary: "#D76565",
  white_third: "rgba(255, 255, 255, 0.24)",
  green_primary: "#5CC691",
  gray_primary: "#404040",
  gray_secondary: "#545458",
  gray_fourth: " #2D2D2D",
} as const;

export const defaultTheme = {
  colors: {
    white: {
      primary: palette.white,
      secondary: palette.white_secondary,
      third: palette.white_third,
    },
    black: { primary: palette.black },
    orange: {
      primary: palette.orange_primary,
      secondary: palette.orange_secondary,
      third: palette.orange_third,
    },
    red: {
      primary: palette.red_primary,
      secondary: palette.red_secondary,
    },
    green: {
      primary: palette.green_primary,
    },
    gray: {
      primary: palette.gray_primary,
      secondy: palette.gray_secondary,
      third: palette.gray_dark,
      fourth: palette.gray_fourth,
    },
  },
  fontSizes: {
    _12: 12,
    _14: 14,
    _16: 16,
    _18: 18,
  },
  fontFamily: {
    geologica_400: "Geologica-Regular",
    geologica_500: "Geologica-Medium",
  },
  images: {
    background: require("../assets/background-app.png"),
  },
} as const;
