import { FC } from "react";
import { TouchableOpacity } from "react-native";
import { Button, useTheme } from "react-native-paper";

type ResetButtonProps = {
  onPress: () => void;
};

export const ResetButton: FC<ResetButtonProps> = ({ onPress }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity>
      <Button
        icon="refresh"
        buttonColor={theme.colors?.secondaryContainer}
        textColor={theme.colors?.onSecondaryContainer}
        mode="elevated"
        onPress={onPress}
      >
        Reset
      </Button>
    </TouchableOpacity>
  );
};
