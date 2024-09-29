import { Platform } from "react-native";
import { DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    primary: "rgb(99, 211, 255)",
    onPrimary: "rgb(0, 53, 69)",
    primaryContainer: "rgb(0, 77, 99)",
    onPrimaryContainer: "rgb(188, 233, 255)",
    secondary: "rgb(180, 202, 213)",
    onSecondary: "rgb(30, 51, 60)",
    secondaryContainer: "rgb(53, 74, 83)",
    onSecondaryContainer: "rgb(208, 230, 242)",
    tertiary: "rgb(197, 194, 234)",
    onTertiary: "rgb(46, 45, 77)",
    tertiaryContainer: "rgb(69, 67, 100)",
    onTertiaryContainer: "rgb(226, 223, 255)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(25, 28, 30)",
    onBackground: "rgb(225, 226, 228)",
    surface: "rgb(25, 28, 30)",
    onSurface: "rgb(225, 226, 228)",
    surfaceVariant: "rgb(64, 72, 76)",
    onSurfaceVariant: "rgb(192, 200, 205)",
    outline: "rgb(138, 146, 151)",
    outlineVariant: "rgb(64, 72, 76)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(225, 226, 228)",
    inverseOnSurface: "rgb(46, 49, 50)",
    inversePrimary: "rgb(0, 103, 131)",
    elevation: {
      level0: "transparent",
      level1: "rgb(29, 37, 41)",
      level2: "rgb(31, 43, 48)",
      level3: "rgb(33, 48, 55)",
      level4: "rgb(34, 50, 57)",
      level5: "rgb(35, 54, 62)",
    },
    surfaceDisabled: "rgba(225, 226, 228, 0.12)",
    onSurfaceDisabled: "rgba(225, 226, 228, 0.38)",
    backdrop: "rgba(42, 50, 53, 0.4)",
  },
  spacing: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 32,
    xxl: 64,
    xxxl: 128,
  },
  radius: {
    button: 10,
  },
  fonts: {
    ...DefaultTheme.fonts,
    default: {
      ...DefaultTheme.fonts.default,
      fontFamily: Platform.select({
        ios: "Play-Regular",
        android: "Play_400Regular",
      }),
    },
    play: {
      fontFamily: Platform.select({
        ios: "Play-Regular",
        android: "Play_400Regular",
      }),
    },
    play_bold: {
      fontFamily: Platform.select({
        ios: "Play-Bold",
        android: "Play_700Bold",
      }),
    },
    syneMono: {
      fontFamily: Platform.select({
        ios: "SyneMono-Regular",
        android: "SyneMono_400Regular",
      }),
    },
  },
};
