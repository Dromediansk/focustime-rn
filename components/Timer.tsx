import { useFocusStore } from "@/store/focusStore";
import { formatTime } from "@/utils/functions";
import { theme } from "@/utils/theme";
import { TimerState } from "@/utils/types";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export const Timer = () => {
  const { time, increaseTime, timerState } = useFocusStore((state) => state);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (timerState === TimerState.RUNNING) {
      timer = setInterval(increaseTime, 1000);
    } else if (timerState === TimerState.PAUSED && timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timerState]);

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
