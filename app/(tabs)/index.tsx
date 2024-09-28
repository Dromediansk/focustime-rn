import { StyleSheet, View } from "react-native";
import { PaperProvider, Text, TextInput } from "react-native-paper";
import { theme } from "@/utils/theme";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusStore } from "@/store/focusStore";
import { TimerState } from "@/utils/types";
import { PressableButton } from "@/components/PressableButton";

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
      </LinearGradient>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
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
