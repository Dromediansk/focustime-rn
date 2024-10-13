import { StyleSheet, View } from "react-native";
import { PaperProvider, Text, TextInput } from "react-native-paper";
import { theme } from "@/utils/theme";
import { useRouter } from "expo-router";
import { useFocusStore } from "@/store/focusStore";
import { TimerState } from "@/utils/types";
import { PressableButton } from "@/components/PressableButton";
import { AppBackground } from "@/components/AppBackground";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import { BREAK_INTERVAL_OPTIONS } from "@/utils/constants";
import {
  addBreakNotificationListener,
  initializeBreakNotification,
  scheduleBreakNotification,
} from "@/service/notifications";
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

  const handlePressStart = async () => {
    if (notificationPermission === "granted") {
      const breakNotificationId = await scheduleBreakNotification();
      setBreakInterval({
        ...breakInterval,
        currentNotificationId: breakNotificationId,
      });
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
  }, [breakInterval, setBreakInterval, setTimerState]);

  return (
    <PaperProvider theme={theme}>
      <AppBackground style={styles.container}>
        <Text style={styles.appTitle}>FOCUSTIME</Text>
        <View style={styles.focusSubjectContainer}>
          <Text style={styles.introText}>What's your target?</Text>
          <TextInput
            style={styles.inputContainer}
            contentStyle={{ fontFamily: theme.fonts.play.fontFamily }}
            mode="flat"
            value={focusSubject}
            onChange={(e) => setFocusSubject(e.nativeEvent.text)}
            placeholder="i.e. deep work, exercise or meditating"
            placeholderTextColor={theme.colors?.onSurfaceDisabled}
          />
          <View style={styles.breakContainer}>
            <Text style={styles.breakText}>Take a break every</Text>
            <View style={styles.breakTextContainer}>
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
                wrapperHeight={60}
                wrapperBackground="transparent"
                activeItemTextStyle={{ color: theme.colors.onPrimaryContainer }}
                itemTextStyle={{ color: theme.colors.surfaceDisabled }}
                itemHeight={20}
                highlightColor="transparent"
              />
            </View>
            <Text style={styles.breakText}>minutes</Text>
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
  breakTextContainer: {
    width: 20,
    height: 60,
    justifyContent: "center",
  },
  breakText: {
    fontSize: theme.fonts.bodyLarge.fontSize,
    color: theme.colors.onPrimaryContainer,
  },
});
