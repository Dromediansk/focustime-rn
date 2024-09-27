import { FC } from "react";
import { Pressable } from "react-native";
import { IconButton } from "react-native-paper";
import { TimerState } from "@/utils/types";
import { theme } from "@/utils/theme";

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
  return (
    <Pressable onPress={onPress}>
      <IconButton
        mode="outlined"
        containerColor={theme.colors.tertiaryContainer}
        iconColor={theme.colors.onTertiaryContainer}
        icon={getIcon(timerState)}
        size={60}
      />
    </Pressable>
  );
};
