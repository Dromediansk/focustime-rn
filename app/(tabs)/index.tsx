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
  registerForPushNotificationsAsync,
  scheduleBreakNotification,
} from "@/service/notifications";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationCategoryAsync("break", [
  {
    buttonTitle: "Take a break",
    identifier: "pause",
    options: {
      opensAppToForeground: true,
    },
  },
  {
    buttonTitle: "Ignore",
    identifier: "ignore",
    options: {
      opensAppToForeground: false,
    },
  },
]);

export default function App() {
  const { navigate } = useRouter();
  const {
    setTimerState,
    focusSubject,
    setFocusSubject,
    breakInterval,
    setBreakInterval,
  } = useFocusStore((state) => state);

  const handlePressStart = async () => {
    const result = await registerForPushNotificationsAsync();

    if (result === "granted") {
      console.log("Notification permission granted");
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
    const subscription = Notifications.addNotificationResponseReceivedListener(
      async (response) => {
        if (
          response.actionIdentifier === "pause" &&
          breakInterval?.currentNotificationId
        ) {
          setTimerState(TimerState.PAUSED);

          await Notifications.cancelScheduledNotificationAsync(
            breakInterval.currentNotificationId
          );
          await Notifications.dismissNotificationAsync(
            breakInterval.currentNotificationId
          );
        } else if (
          response.actionIdentifier === "ignore" &&
          breakInterval.currentNotificationId
        ) {
          await Notifications.dismissNotificationAsync(
            breakInterval.currentNotificationId
          );
        }
      }
    );

    return () => {
      subscription.remove();
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
    color: theme.colors.onPrimaryContainer,
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
    width: "80%",
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
