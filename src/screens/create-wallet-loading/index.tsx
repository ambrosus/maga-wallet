import { useCallback, useEffect } from 'react';
import { Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacer, Typography } from '@components/atoms';
import {
  ANIMATION_DELAY,
  COLORS,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  FONT_SIZE
} from '@constants';
import { useAnimatedDots } from '@lib/hooks';
import { RootNavigationScreenProps } from '@navigation/root-stack';
import { verticalScale } from '@utils';
import { styles } from './styles';

export const CreateWalletLoadingScreen = ({
  navigation
}: RootNavigationScreenProps<'CreateWalletLoadingScreen'>) => {
  const scale = useSharedValue(1);
  const { DotsComponent, setIsAnimating } = useAnimatedDots();

  useFocusEffect(
    useCallback(() => {
      setIsAnimating(true);

      return () => {
        setIsAnimating(false);
      };
    }, [setIsAnimating])
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.navigate('Tabs');
    }, ANIMATION_DELAY * 10);

    return () => clearTimeout(timeoutId);
  }, [navigation]);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.45, {
        duration: ANIMATION_DELAY * 2,
        easing: Easing.inOut(Easing.ease)
      }),
      -1, // Infinite repetitions
      true // Reverse
    );
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: 36,
    height: 36,
    borderRadius: 36,
    backgroundColor: '#D9D9D9',
    transform: [{ scale: scale.value }]
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.background}
        width={DEVICE_WIDTH}
        height={DEVICE_HEIGHT}
        source={require('@assets/images/create-wallet-background.png')}
      />
      <Animated.View style={animatedStyle} />

      <Spacer value={verticalScale(32)} />

      <Typography
        fontSize={FONT_SIZE.heading.lg}
        fontFamily="Onest600SemiBold"
        color={COLORS.textPrimary}
      >
        Creating your wallet
        <DotsComponent />
      </Typography>
    </SafeAreaView>
  );
};
