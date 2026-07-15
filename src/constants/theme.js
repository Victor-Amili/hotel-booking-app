import COLORS from "./colors";

export const LightTheme = {
  dark: false,

  colors: {
    background: COLORS.background,
    card: COLORS.card,
    text: COLORS.text,
    primary: COLORS.primary,
    border: COLORS.lightGray,
  },
};

export const DarkTheme = {
  dark: true,

  colors: {
    background: COLORS.backgroundDark,
    card: COLORS.cardDark,
    text: COLORS.textDark,
    primary: COLORS.primary,
    border: "#2C2C2C",
  },
};