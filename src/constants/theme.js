import { COLORS } from "./colors";

// ============================================
// LIGHT THEME
// ============================================
export const lightTheme = {
  mode: "light",
  
  // Backgrounds
  background: COLORS.white,
  backgroundSecondary: COLORS.gray50,
  backgroundTertiary: COLORS.gray100,
  
  // Cards & Surfaces
  card: COLORS.white,
  cardSecondary: COLORS.gray50,
  
  // Text
  text: COLORS.black,
  textSecondary: COLORS.gray500,
  textTertiary: COLORS.gray400,
  textInverse: COLORS.white,
  
  // Borders
  border: COLORS.gray200,
  borderLight: COLORS.gray100,
  
  // Inputs
  inputBackground: COLORS.gray50,
  inputBorder: COLORS.gray200,
  inputPlaceholder: COLORS.gray400,
  
  // Primary
  primary: COLORS.primary,
  primaryLight: COLORS.primaryLight,
  primaryDark: COLORS.primaryDark,
  
  // Status
  success: COLORS.success,
  error: COLORS.error,
  warning: COLORS.warning,
  info: COLORS.info,
  
  // Misc
  shadow: "rgba(0, 0, 0, 0.1)",
  overlay: COLORS.overlay,
  divider: COLORS.gray200,
  star: COLORS.star,
  starEmpty: COLORS.gray300,
};

// ============================================
// DARK THEME
// ============================================
export const darkTheme = {
  mode: "dark",
  
  // Backgrounds
  background: COLORS.black,
  backgroundSecondary: "#1C1C1E",
  backgroundTertiary: "#2C2C2E",
  
  // Cards & Surfaces
  card: "#1C1C1E",
  cardSecondary: "#2C2C2E",
  
  // Text
  text: COLORS.white,
  textSecondary: "#A1A1AA",
  textTertiary: "#71717A",
  textInverse: COLORS.black,
  
  // Borders
  border: "#3F3F46",
  borderLight: "#27272A",
  
  // Inputs
  inputBackground: "#27272A",
  inputBorder: "#3F3F46",
  inputPlaceholder: "#71717A",
  
  // Primary (stays same)
  primary: COLORS.primary,
  primaryLight: "#1A3A23",
  primaryDark: COLORS.primaryDark,
  
  // Status
  success: COLORS.success,
  error: COLORS.error,
  warning: COLORS.warning,
  info: COLORS.info,
  
  // Misc
  shadow: "rgba(0, 0, 0, 0.3)",
  overlay: "rgba(0, 0, 0, 0.7)",
  divider: "#3F3F46",
  star: COLORS.star,
  starEmpty: "#52525B",
};

export default { lightTheme, darkTheme };