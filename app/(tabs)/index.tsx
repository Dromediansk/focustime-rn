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
          <Text
            style={{
              fontSize: 25,
              color: theme.colors?.primary,
            }}
          >
            Keep your focus on:
          </Text>
          <TextInput
            style={styles.inputContainer}
            mode="flat"
            value={focusSubject}
            onChange={(e) => setFocusSubject(e.nativeEvent.text)}
            placeholder="i.e. working"
          />
        </View>

        <PressableButton
          disabled={!!!focusSubject}
          text="START"
          onPress={handlePressStart}
        />
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
  focusSubjectContainer: {
    gap: theme.spacing.md,
    alignItems: "center",
  },
  inputContainer: {
    width: 200,
  },
});
