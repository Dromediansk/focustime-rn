import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { Button, MD2Colors } from "react-native-paper";

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
        buttonColor={MD2Colors.red300}
        textColor={MD2Colors.white}
        onPress={onPress}
        disabled={disabled}
      >
        Stop
      </Button>
    </TouchableOpacity>
  );
};
