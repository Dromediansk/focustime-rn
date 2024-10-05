import { useFocusStore } from "@/store/focusStore";
import { formatTime } from "@/utils/functions";
import { theme } from "@/utils/theme";
import { Time, TimerState } from "@/utils/types";
import { FC, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

type TimerProps = {
  time: Time;
  onTimeTick: () => void;
};

export const Timer: FC<TimerProps> = ({ onTimeTick, time }) => {
  const timerState = useFocusStore((state) => state.timerState);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (timerState === TimerState.RUNNING) {
      timer = setInterval(onTimeTick, 1000);
    } else if (timerState === TimerState.PAUSED && timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [onTimeTick, timerState]);

  return (
    <View>
      <Text style={styles.timerText}>{formatTime(time)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerText: {
    fontSize: 60,
    color: theme.colors?.primary,
    fontFamily: theme.fonts.play.fontFamily,
  },
});
