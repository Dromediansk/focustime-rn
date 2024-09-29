import { theme } from "@/utils/theme";
import { LinearGradient } from "expo-linear-gradient";
import { FC, ReactNode } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

type AppBackgroundProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const AppBackground: FC<AppBackgroundProps> = ({ children, style }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        theme.colors?.onTertiary,
        theme.colors?.onSecondary,
        theme.colors?.onPrimary,
      ]}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
