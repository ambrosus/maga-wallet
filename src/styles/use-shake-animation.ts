import { useCallback } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming
} from 'react-native-reanimated';

export const useShakeAnimation = () => {
  const translateX = useSharedValue(0);

  const triggerShake = useCallback(() => {
    translateX.value = withSequence(
      withTiming(10, { duration: 50 }),
      withTiming(-10, { duration: 50 }),
      withTiming(6, { duration: 50 }),
      withTiming(-6, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }));

  return { animatedStyle, triggerShake };
};
