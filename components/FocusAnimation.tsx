import React, { useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
  withSequence,
  cancelAnimation,
} from "react-native-reanimated";
import { theme } from "@/utils/theme";

const duration = 10000;
const easing = Easing.inOut(Easing.ease);

const getRandomValue = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const FocusAnimation = () => {
  const rotation = useSharedValue<number>(0);
  const scale = useSharedValue<number>(1);
  const animatedColor = useSharedValue(theme.colors?.primary);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value * 360}deg` },
      { scale: scale.value },
    ],
    backgroundColor: animatedColor.value,
  }));

  const startAnimation = useCallback(() => {
    rotation.value = withRepeat(withTiming(1, { duration, easing }), -1);
    scale.value = withRepeat(
      withSequence(
        withTiming(1.5, { duration, easing }),
        withTiming(1, { duration, easing })
      ),
      -1
    );
    animatedColor.value = withRepeat(
      withTiming(
        `rgb(${getRandomValue(0, 255)}, ${getRandomValue(
          0,
          255
        )}, ${getRandomValue(0, 255)})`,
        { duration: 20000 }
      ),
      -1,
      true
    );
  }, [animatedColor, rotation, scale]);

  const stopAnimation = useCallback(() => {
    cancelAnimation(rotation);
    cancelAnimation(scale);
    cancelAnimation(animatedColor);
  }, [animatedColor, rotation, scale]);

  useEffect(() => {
    startAnimation();

    return () => {
      stopAnimation();
    };
  }, [startAnimation, stopAnimation]);

  return <Animated.View style={[styles.box, animatedStyle]} />;
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
