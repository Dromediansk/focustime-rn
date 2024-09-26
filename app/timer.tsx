import { Text, StyleSheet, View } from "react-native";
import { theme } from "@/utils/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusStore } from "@/store/focusStore";
import { Time, TimerState } from "@/utils/types";
import { ResetButton } from "@/components/ResetButton";
import { useRouter } from "expo-router";
import { StopButton } from "@/components/StopButton";
import { useState } from "react";
import { Timer } from "@/components/Timer";
import { updateTime } from "@/utils/functions";
import { FocusAnimation } from "@/components/FocusAnimation";
import { PlayButton } from "@/components/PlayButton";

const defaultTime: Time = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export default function TimerScreen() {
  const { navigate, replace } = useRouter();
  const { timerState, setTimerState } = useFocusStore((state) => state);
  const [time, setTime] = useState<Time>(defaultTime);

  const handleReset = () => {
    // setFocusSubject("");
    navigate("/");
  };

  const handlePressPlay = () => {
    if (timerState === TimerState.RUNNING) {
      setTimerState(TimerState.PAUSED);
    }
    if (timerState === TimerState.PAUSED || timerState === TimerState.IDLE) {
      setTimerState(TimerState.RUNNING);
    }
  };

  const handleStop = async () => {
    setTimerState(TimerState.IDLE);
    setTime(defaultTime);
    // await addSummaryItem({
    //   title: focusSubject,
    //   time,
    // });
    replace("/summary");
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        theme.colors?.onTertiary,
        theme.colors?.onSecondary,
        theme.colors?.onPrimary,
      ]}
      style={styles.container}
    >
      <View style={styles.stopAndResetContainer}>
        <ResetButton onPress={handleReset} />
        <StopButton
          onPress={handleStop}
          disabled={timerState === TimerState.IDLE}
        />
      </View>
      <Timer
        timerState={timerState}
        time={time}
        onTimeUpdate={() => setTime(updateTime)}
      />
      <View style={styles.animationContainer}>
        {timerState === TimerState.RUNNING && <FocusAnimation />}
      </View>
      <View>
        {timerState === TimerState.PAUSED && (
          <Text style={styles.introText}>Press play to continue focus</Text>
        )}
        {timerState === TimerState.RUNNING && (
          <Text style={styles.focusText}>Focusing...</Text>
        )}
      </View>
      <View style={styles.controlsContainer}>
        <PlayButton timerState={timerState} onPress={handlePressPlay} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  stopAndResetContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  animationContainer: {
    height: 100,
  },
  focusText: {
    fontSize: 30,
    color: theme.colors?.primary,
  },
  introText: {
    fontSize: 30,
    color: theme.colors?.tertiary,
  },
  controlsContainer: {
    alignItems: "center",
    gap: 20,
  },
});
