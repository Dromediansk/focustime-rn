import { FC } from "react";
import { Platform, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import * as Haptics from "expo-haptics";
import { theme } from "@/utils/theme";

type PressableButtonProps = {
  onPress: () => void;
  text: string;
  disabled?: boolean;
};

export const PressableButton: FC<PressableButtonProps> = ({
  onPress,
  text,
  disabled,
}) => {
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
          return [styles.button, styles.buttonDisabled];
        }
        if (pressed) {
          return [styles.button, styles.buttonPressed];
        }
        return styles.button;
      }}
    >
      <Text
        style={{
          ...styles.text,
          color: disabled
            ? theme.colors.onSurfaceDisabled
            : theme.colors.onTertiaryContainer,
        }}
      >
        {text}
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
  button: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderRadius: 6,
    backgroundColor: theme.colors.tertiaryContainer,
  },
  buttonPressed: {
    backgroundColor: theme.colors.onTertiary,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.surfaceDisabled,
  },
});
