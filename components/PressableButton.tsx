import { FC, ReactNode } from "react";
import { Platform, Pressable, StyleSheet, ViewStyle } from "react-native";
import { Text } from "react-native-paper";
import * as Haptics from "expo-haptics";
import { theme } from "@/utils/theme";

type ButtonStyle = ViewStyle & {
  color: string;
  backgroundColor: string;
};

type PressableButtonProps = {
  onPress: () => void;
  children: ReactNode;
  disabled?: boolean;
  buttonStyle?: ButtonStyle;
  buttonPressedStyle?: ViewStyle;
  buttonDisabledStyle?: ButtonStyle;
  size?: keyof typeof theme.spacing;
};

export const PressableButton: FC<PressableButtonProps> = ({
  onPress,
  children,
  disabled = false,
  buttonStyle = styles.button,
  buttonPressedStyle = styles.buttonPressed,
  buttonDisabledStyle = styles.buttonDisabled,
  size = "lg",
}) => {
  const paddingVertical = theme.spacing[size];
  const paddingHorizontal = paddingVertical * 2;
  const defaultStyles = [
    styles.buttonDefaults,
    { paddingHorizontal, paddingVertical },
  ];

  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={handlePress}
      style={({ pressed }) => {
        if (disabled) {
          return [defaultStyles, buttonDisabledStyle];
        }
        if (pressed) {
          return [defaultStyles, buttonPressedStyle];
        }
        return [defaultStyles, buttonStyle];
      }}
    >
      <Text
        style={[
          styles.text,
          disabled
            ? { color: theme.colors.onSurfaceDisabled }
            : { color: buttonStyle.color },
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: theme.fonts.bodyLarge.fontSize,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonDefaults: {
    borderRadius: theme.radius.button,
    fontFamily: theme.fonts.play.fontFamily,
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.onPrimary,
  },
  buttonPressed: {
    backgroundColor: theme.colors.onPrimary,
    color: theme.colors.primary,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.surfaceDisabled,
  },
});
