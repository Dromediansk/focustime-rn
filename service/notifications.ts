import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useFocusStore } from "@/store/focusStore";
import { TimerState } from "@/utils/types";

enum NotificationCategory {
  BREAK = "break",
}

const registerForPushNotificationsAsync = async () => {
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

const createBreakNotificationCategory = async () =>
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

export const initializeBreakNotification = async () => {
  try {
    const [notificationStatus, notificationCategory] = await Promise.all([
      registerForPushNotificationsAsync(),
      createBreakNotificationCategory(),
    ]);
    return { notificationStatus, notificationCategory };
  } catch (error) {
    console.error("Error initializing break notification:", error);
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
      color: "#003545",
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
    try {
      const { breakInterval, setBreakInterval, setTimerState } =
        useFocusStore.getState();

      if (!breakInterval.currentNotificationId) {
        throw new Error("Technical error occured.");
      }

      if (response.actionIdentifier === "pause") {
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
      } else if (response.actionIdentifier === "ignore") {
        await Notifications.dismissNotificationAsync(
          breakInterval.currentNotificationId
        );
      }
    } catch (error) {
      console.error(error);
    }
  });
