import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useFocusStore } from "@/store/focusStore";

export const registerForPushNotificationsAsync = async () => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      showBadge: false,
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
      color: "blue",
      categoryIdentifier: "break",
      vibrate: [0, 255, 255, 255],
    },
    trigger: {
      seconds: 5,
      repeats: true,
    },
  });

  return pushNotificationId;
};
