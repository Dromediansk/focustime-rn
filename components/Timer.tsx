import { useFocusStore } from "@/store/focusStore";
import { useTimestampStore } from "@/store/timestampStore";
import { formatTime, setTimeFromBackground } from "@/utils/timeFunctions";
import { theme } from "@/utils/theme";
import { Time, TimerState } from "@/utils/types";
import { FC, useEffect, useState } from "react";
import { AppState, AppStateStatus, StyleSheet, Text, View } from "react-native";

type TimerProps = {
  currentTimer: Time;
  setCurrentTimer: (time: Time) => void;
  onTimeTick: () => void;
};

export const Timer: FC<TimerProps> = ({
  onTimeTick,
  setCurrentTimer,
  currentTimer,
}) => {
  const timerState = useFocusStore((state) => state.timerState);
  const { setTimestamp } = useTimestampStore((state) => state);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "background" && timerState === TimerState.RUNNING) {
        setTimestamp();
        setLoading(true);
      } else if (
        nextAppState === "active" &&
        timerState === TimerState.RUNNING
      ) {
        setTimeFromBackground(currentTimer, setCurrentTimer);
        setLoading(false);
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [setCurrentTimer, setTimestamp, currentTimer, timerState]);

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
      <Text style={styles.timerText}>
        {!loading && formatTime(currentTimer)}
      </Text>
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
