import { formatTime } from "@/utils/functions";
import { theme } from "@/utils/theme";
import { Time, TimerState } from "@/utils/types";
import { FC, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

type TimerProps = {
  timerState: TimerState;
  time: Time;
  onTimeUpdate: () => void;
};

export const Timer: FC<TimerProps> = ({ timerState, time, onTimeUpdate }) => {
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (timerState === TimerState.RUNNING) {
      timer = setInterval(onTimeUpdate, 1000);
    } else if (timerState === TimerState.PAUSED && timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [onTimeUpdate, timerState]);

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
  },
});
