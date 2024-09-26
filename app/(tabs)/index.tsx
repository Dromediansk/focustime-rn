import { StyleSheet } from "react-native";
import { Button, PaperProvider } from "react-native-paper";
import { theme } from "@/utils/theme";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusStore } from "@/store/focusStore";
import { TimerState } from "@/utils/types";

export default function App() {
  const { navigate } = useRouter();
  const setTimerState = useFocusStore((state) => state.setTimerState);

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
        <Button mode="contained" onPress={handlePressStart}>
          Start focus
        </Button>
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
});
