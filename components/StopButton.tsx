import { theme } from "@/utils/theme";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";

type StopButtonProps = {
  onPress: () => void;
  disabled: boolean;
};

export const StopButton: FC<StopButtonProps> = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity disabled={disabled}>
      <Button
        icon="stop"
        mode="elevated"
        buttonColor={theme.colors.tertiaryContainer}
        textColor={theme.colors.onTertiaryContainer}
        onPress={onPress}
        disabled={disabled}
      >
        Stop
      </Button>
    </TouchableOpacity>
  );
};
