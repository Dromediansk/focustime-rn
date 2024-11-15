import { StyleSheet, View } from "react-native";
import { PaperProvider, Text, TextInput } from "react-native-paper";
import { theme } from "@/utils/theme";
import { useRouter } from "expo-router";
import { useFocusStore } from "@/stores/focusStore";
import { TimerState } from "@/utils/types";
import { PressableButton } from "@/components/PressableButton";
import { AppBackground } from "@/components/AppBackground";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import { BREAK_INTERVAL_OPTIONS } from "@/utils/constants";
import {
  addBreakNotificationListener,
  initializeBreakNotification,
  scheduleBreakNotification,
} from "@/services/notifications";
import { useEffect, useState } from "react";
import { PermissionStatus } from "expo-notifications";

export default function App() {
  const { navigate } = useRouter();
  const {
    setTimerState,
    focusSubject,
    setFocusSubject,
    breakInterval,
    setBreakInterval,
  } = useFocusStore((state) => state);

  const [notificationPermission, setNotificationPermission] =
    useState<PermissionStatus | null>(null);

  const handlePressStart = () => {
    if (notificationPermission === "granted") {
      scheduleBreakNotification();
    }

    setTimerState(TimerState.RUNNING);
    navigate("/timer");
  };

  useEffect(() => {
    async function initializeNotification() {
      const result = await initializeBreakNotification();
      if (result?.notificationStatus) {
        setNotificationPermission(result.notificationStatus);
      }
    }
    initializeNotification();
  }, []);

  useEffect(() => {
    const breakNotificationSubscription = addBreakNotificationListener();

    return () => {
      breakNotificationSubscription.remove();
    };
  }, []);

  return (
    <PaperProvider theme={theme}>
      <AppBackground style={styles.container}>
        <Text style={styles.appTitle}>FOCUSTIME</Text>
        <View style={styles.focusSubjectContainer}>
          <Text style={styles.introText}>What's your target?</Text>
          <TextInput
            style={styles.inputContainer}
            contentStyle={{
              fontFamily: theme.fonts.play.fontFamily,
            }}
            mode="flat"
            value={focusSubject}
            onChange={(e) => setFocusSubject(e.nativeEvent.text)}
            placeholder="deep work, exercise, meditating.."
            placeholderTextColor={theme.colors?.onSurfaceDisabled}
          />
          <Text style={styles.breakText}>Break interval in minutes:</Text>
          <View style={styles.breakContainer}>
            <ScrollPicker
              dataSource={BREAK_INTERVAL_OPTIONS}
              selectedIndex={BREAK_INTERVAL_OPTIONS.indexOf(
                breakInterval.interval
              )}
              onValueChange={(data) => {
                if (!data) {
                  return;
                }
                setBreakInterval({
                  ...breakInterval,
                  interval: data,
                });
              }}
              wrapperHeight={75}
              wrapperBackground="transparent"
              activeItemTextStyle={{
                color: theme.colors.onPrimaryContainer,
                fontSize: theme.fonts.titleLarge.fontSize,
              }}
              itemTextStyle={{
                color: theme.colors.surfaceDisabled,
                fontSize: theme.fonts.titleLarge.fontSize,
              }}
              itemHeight={25}
              highlightColor="transparent"
            />
          </View>
        </View>
        <PressableButton disabled={!!!focusSubject} onPress={handlePressStart}>
          START
        </PressableButton>
      </AppBackground>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  appTitle: {
    fontSize: theme.fonts.displayLarge.fontSize,
    fontFamily: theme.fonts.syneMono.fontFamily,
    color: theme.colors.primary,
  },
  introText: {
    fontSize: theme.fonts.headlineSmall.fontSize,
    color: theme.colors.onPrimaryContainer,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  focusSubjectContainer: {
    gap: theme.spacing.lg,
    alignItems: "center",
    width: "100%",
  },
  inputContainer: {
    width: "90%",
    backgroundColor: theme.colors?.onPrimary,
  },
  breakContainer: {
    flexDirection: "row",
    gap: theme.spacing.md,
    alignItems: "center",
  },
  breakText: {
    fontSize: theme.fonts.titleLarge.fontSize,
    color: theme.colors.onPrimaryContainer,
  },
});
