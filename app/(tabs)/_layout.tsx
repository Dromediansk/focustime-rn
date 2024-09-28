import { Entypo } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { theme } from "@/utils/theme";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors?.primary,
        tabBarActiveBackgroundColor: theme.colors?.secondaryContainer,
        tabBarInactiveBackgroundColor: theme.colors?.onPrimary,
        tabBarStyle: {
          borderTopColor: theme.colors.surfaceVariant,
          backgroundColor: theme.colors.onPrimary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Entypo name="bar-graph" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
