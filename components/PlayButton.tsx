import { FC } from "react";
import { TouchableOpacity } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { TimerState } from "@/utils/types";

type PlayButtonProps = {
  timerState: TimerState;
  onPress: () => void;
};

const getIcon = (timerState: TimerState) => {
  switch (timerState) {
    case TimerState.RUNNING:
      return "pause";
    default:
      return "play";
  }
};

export const PlayButton: FC<PlayButtonProps> = ({ timerState, onPress }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <IconButton
        mode="outlined"
        containerColor={theme.colors.primaryContainer}
        iconColor={theme.colors.onPrimaryContainer}
        icon={getIcon(timerState)}
        size={60}
      />
    </TouchableOpacity>
  );
};
