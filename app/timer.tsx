import { Text, StyleSheet, View } from "react-native";
import { theme } from "@/utils/theme";
import { useFocusStore } from "@/store/focusStore";
import { Time, TimerState } from "@/utils/types";
import { ResetButton } from "@/components/ResetButton";
import { useRouter } from "expo-router";
import { StopButton } from "@/components/StopButton";
import { Timer } from "@/components/Timer";
import { updateTime } from "@/utils/functions";
import { FocusAnimation } from "@/components/FocusAnimation";
import { PlayButton } from "@/components/PlayButton";
import { useSummaryStore } from "@/store/summaryStore";
import { AppBackground } from "@/components/AppBackground";

const defaultTime: Time = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export default function TimerScreen() {
  const { navigate, replace } = useRouter();
  const {
    timerState,
    setTimerState,
    focusSubject,
    setFocusSubject,
    time,
    setTime,
  } = useFocusStore((state) => state);
  const addSummaryItem = useSummaryStore((state) => state.addSummaryItem);

  const handleReset = () => {
    setFocusSubject("");
    setTime(defaultTime);
    setTimerState(TimerState.IDLE);
    navigate("/");
  };

  const handlePressPlay = async () => {
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
    addSummaryItem({
      title: focusSubject,
      time,
    });
    replace("/summary");
    setFocusSubject("");
  };

  return (
    <AppBackground style={styles.container}>
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
        onTimeUpdate={() => setTime(updateTime(time))}
      />
      <View style={styles.animationContainer}>
        {timerState === TimerState.RUNNING && <FocusAnimation />}
      </View>
      <View>
        {timerState === TimerState.PAUSED && (
          <Text style={styles.continueText}>
            Press play and keep the momentum going!
          </Text>
        )}
        {timerState === TimerState.RUNNING && (
          <Text style={styles.focusText}>{focusSubject}...</Text>
        )}
      </View>
      <PlayButton timerState={timerState} onPress={handlePressPlay} />
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
  },
  stopAndResetContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  animationContainer: {
    height: 120,
    minHeight: 120,
  },
  focusText: {
    fontSize: theme.fonts.headlineMedium.fontSize,
    color: theme.colors?.primary,
    fontFamily: theme.fonts.play.fontFamily,
  },
  continueText: {
    fontSize: theme.fonts.headlineMedium.fontSize,
    fontFamily: theme.fonts.play.fontFamily,
    color: theme.colors?.secondary,
    textAlign: "center",
  },
});
