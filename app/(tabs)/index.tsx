import { StyleSheet, View } from "react-native";
import { PaperProvider, Text, TextInput } from "react-native-paper";
import { theme } from "@/utils/theme";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusStore } from "@/store/focusStore";
import { TimerState } from "@/utils/types";
import { PressableButton } from "@/components/PressableButton";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Play_400Regular, Play_700Bold } from "@expo-google-fonts/play";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    Play_400Regular,
    Play_700Bold,
  });

  const { navigate } = useRouter();
  const { setTimerState, focusSubject, setFocusSubject } = useFocusStore(
    (state) => state
  );

  const handlePressStart = () => {
    setTimerState(TimerState.RUNNING);
    navigate("/timer");
  };

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

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
          <Text style={styles.introText}>Keep your focus on:</Text>
          <TextInput
            style={styles.inputContainer}
            contentStyle={{ fontFamily: "Play_400Regular" }}
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
  introText: {
    fontSize: theme.fonts.headlineMedium.fontSize,
    color: theme.colors.onTertiaryContainer,
  },
  focusSubjectContainer: {
    gap: theme.spacing.md,
    alignItems: "center",
  },
  inputContainer: {
    width: 200,
  },
});
