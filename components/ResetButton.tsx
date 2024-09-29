import { FC } from "react";
import { TouchableOpacity } from "react-native";
import { Button, useTheme } from "react-native-paper";
import Entypo from "@expo/vector-icons/Entypo";

type ResetButtonProps = {
  onPress: () => void;
};

export const ResetButton: FC<ResetButtonProps> = ({ onPress }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity>
      <Button
        icon={({ size, color }) => (
          <Entypo name="back" size={size} color={color} />
        )}
        buttonColor={theme.colors?.secondaryContainer}
        textColor={theme.colors?.onSecondaryContainer}
        mode="elevated"
        onPress={onPress}
      >
        Go back
      </Button>
    </TouchableOpacity>
  );
};
