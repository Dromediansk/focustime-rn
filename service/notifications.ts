import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useFocusStore } from "@/store/focusStore";
import { TimerState } from "@/utils/types";

enum NotificationCategory {
  BREAK = "break",
}

export const registerForPushNotificationsAsync = async () => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      showBadge: true,
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      return status;
    } else {
      return existingStatus;
    }
  } else {
    return null;
  }
};

export const scheduleBreakNotification = async () => {
  const { breakInterval, focusSubject } = useFocusStore.getState();

  const pushNotificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time for break! ☕",
      body: `Your activity ${focusSubject} will pay off step by step.`,
      categoryIdentifier: NotificationCategory.BREAK,
      vibrate: [0, 255, 255, 255],
      autoDismiss: true,
    },
    trigger: {
      seconds: breakInterval.interval * 60,
      repeats: true,
    },
  });

  return pushNotificationId;
};

export const addBreakNotificationListener = () =>
  Notifications.addNotificationResponseReceivedListener(async (response) => {
    const { breakInterval, setBreakInterval, setTimerState } =
      useFocusStore.getState();

    if (
      response.actionIdentifier === "pause" &&
      breakInterval?.currentNotificationId
    ) {
      await Promise.all([
        Notifications.cancelScheduledNotificationAsync(
          breakInterval.currentNotificationId
        ),
        Notifications.dismissNotificationAsync(
          breakInterval.currentNotificationId
        ),
      ]);
      setBreakInterval({ ...breakInterval, currentNotificationId: "" });
      setTimerState(TimerState.PAUSED);
    } else if (
      response.actionIdentifier === "ignore" &&
      breakInterval.currentNotificationId
    ) {
      await Notifications.dismissNotificationAsync(
        breakInterval.currentNotificationId
      );
    }
  });

export const createBreakNotificationCategory = async () =>
  await Notifications.setNotificationCategoryAsync("break", [
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
