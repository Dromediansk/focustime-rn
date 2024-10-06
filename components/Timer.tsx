import { useFocusStore } from "@/store/focusStore";
import { useTimestampStore } from "@/store/timestampStore";
import { formatTime, setTimeFromBackground } from "@/utils/functions";
import { theme } from "@/utils/theme";
import { Time, TimerState } from "@/utils/types";
import { FC, useEffect } from "react";
import { AppState, AppStateStatus, StyleSheet, Text, View } from "react-native";

type TimerProps = {
  time: Time;
  setTime: (time: Time) => void;
  onTimeTick: () => void;
};

export const Timer: FC<TimerProps> = ({ onTimeTick, setTime, time }) => {
  const timerState = useFocusStore((state) => state.timerState);
  const { setTimestamp } = useTimestampStore((state) => state);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "background" && timerState === TimerState.RUNNING) {
        setTimestamp(time);
      } else if (
        nextAppState === "active" &&
        timerState === TimerState.RUNNING
      ) {
        setTimeFromBackground(time, setTime);
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [setTime, setTimestamp, time, timerState]);

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
  }, [onTimeTick, setTime, timerState]);

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
