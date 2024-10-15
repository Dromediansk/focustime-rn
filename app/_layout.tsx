import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, animation: "slide_from_left" }}
      />
      <Stack.Screen
        name="timer"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
    </Stack>
  );
}
