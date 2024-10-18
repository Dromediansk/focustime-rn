import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useFocusStore } from "@/stores/focusStore";
import { TimerState } from "@/utils/types";

enum NotificationCategory {
  BREAK = "break",
}

enum ActionIdentifier {
  PAUSE = "pause",
  IGNORE = "ignore",
}

const registerForPushNotifications = async () => {
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
      identifier: ActionIdentifier.PAUSE,
      options: {
        opensAppToForeground: true,
      },
    },
    {
      buttonTitle: "Ignore",
      identifier: ActionIdentifier.IGNORE,
      options: {
        opensAppToForeground: false,
      },
    },
  ]);

export const initializeBreakNotification = async () => {
  try {
    const [notificationStatus, notificationCategory] = await Promise.all([
      registerForPushNotifications(),
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
      interruptionLevel: "active",
      color: "#003545",
    },
    trigger: {
      seconds: breakInterval.interval * 60,
      repeats: true,
      channelId: "default",
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

      if (response.actionIdentifier === ActionIdentifier.PAUSE) {
        await Promise.all([
          cancelBreakNotification(),
          dismissBreakNotification(),
        ]);
        setBreakInterval({ ...breakInterval, currentNotificationId: "" });
        setTimerState(TimerState.PAUSED);
      } else if (response.actionIdentifier === ActionIdentifier.IGNORE) {
        await dismissBreakNotification();
      }
    } catch (error) {
      console.error(error);
    }
  });

export const cancelBreakNotification = async () => {
  const { breakInterval } = useFocusStore.getState();

  if (breakInterval.currentNotificationId) {
    await Notifications.cancelScheduledNotificationAsync(
      breakInterval.currentNotificationId
    );
  }
};

export const dismissBreakNotification = async () => {
  const { breakInterval } = useFocusStore.getState();

  if (breakInterval.currentNotificationId) {
    await Notifications.dismissNotificationAsync(
      breakInterval.currentNotificationId
    );
  }
};
