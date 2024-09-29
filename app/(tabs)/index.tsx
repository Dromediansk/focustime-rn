import { StyleSheet, View } from "react-native";
import { PaperProvider, Text, TextInput } from "react-native-paper";
import { theme } from "@/utils/theme";
import { useRouter } from "expo-router";
import { useFocusStore } from "@/store/focusStore";
import { TimerState } from "@/utils/types";
import { PressableButton } from "@/components/PressableButton";
import { AppBackground } from "@/components/AppBackground";

export default function App() {
  const { navigate } = useRouter();
  const { setTimerState, focusSubject, setFocusSubject } = useFocusStore(
    (state) => state
  );

  const handlePressStart = () => {
    setTimerState(TimerState.RUNNING);
    navigate("/timer");
  };

  return (
    <PaperProvider theme={theme}>
      <AppBackground>
        <View style={styles.focusSubjectContainer}>
          <Text style={styles.introText}>Focus your mind on:</Text>
          <TextInput
            style={styles.inputContainer}
            contentStyle={{ fontFamily: theme.fonts.play.fontFamily }}
            mode="flat"
            value={focusSubject}
            onChange={(e) => setFocusSubject(e.nativeEvent.text)}
            placeholder="i.e. deep work, exercise or meditating"
            placeholderTextColor={theme.colors?.onSurfaceDisabled}
          />
        </View>

        <PressableButton disabled={!!!focusSubject} onPress={handlePressStart}>
          START
        </PressableButton>
      </AppBackground>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  introText: {
    fontSize: theme.fonts.headlineMedium.fontSize,
    color: theme.colors.onPrimaryContainer,
  },
  focusSubjectContainer: {
    gap: theme.spacing.lg,
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    backgroundColor: theme.colors?.onPrimary,
  },
});
