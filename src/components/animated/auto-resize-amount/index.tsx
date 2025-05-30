import { useCallback, useEffect, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { COLORS } from '@constants';

const MIN_FONT_SIZE = 32;
const MAX_FONT_SIZE = 56;
const PADDING = 0;

const SPRING_CONFIG = {
  damping: 50,
  stiffness: 150,
  mass: 0.8,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01
};

interface AutoResizeAmountProps {
  amount: string;
  fontSize?: {
    MIN?: number;
    MAX?: number;
  };
}

export const AutoResizeAmount = ({
  amount,
  fontSize = { MIN: MIN_FONT_SIZE, MAX: MAX_FONT_SIZE }
}: AutoResizeAmountProps) => {
  const [containerWidth, setContainerWidth] = useState(0);

  const progressSV = useSharedValue(1);
  const previousFontSizeSV = useSharedValue(MAX_FONT_SIZE);
  const nextFontSizeSV = useSharedValue(MAX_FONT_SIZE);

  const calculateFontSize = useCallback(
    (text: string, maxWidth: number) => {
      if (!text || text.length === 0 || maxWidth <= 0) {
        return fontSize.MAX;
      }

      const charWidthToFsRatio = 0.8;
      let idealFs = maxWidth / (text.length * charWidthToFsRatio);
      idealFs *= 0.97;

      return Math.max(
        fontSize.MIN ?? MIN_FONT_SIZE,
        Math.min(fontSize.MAX ?? MAX_FONT_SIZE, Math.floor(idealFs))
      );
    },
    [fontSize.MAX, fontSize.MIN]
  );

  const onTextContainerLayout = useCallback((event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  }, []);

  useEffect(() => {
    if (containerWidth > 0) {
      const newCalculatedFontSize = calculateFontSize(
        amount || '0', // Use '0' as fallback for amount
        containerWidth - PADDING
      );

      previousFontSizeSV.value = nextFontSizeSV.value;
      nextFontSizeSV.value = newCalculatedFontSize ?? MAX_FONT_SIZE;

      progressSV.value = 0;
      progressSV.value = withSpring(1, SPRING_CONFIG);
    }
  }, [
    amount,
    containerWidth,
    calculateFontSize,
    nextFontSizeSV,
    previousFontSizeSV,
    progressSV,
    fontSize.MAX
  ]);

  const animatedFontSize = useDerivedValue(() => {
    return interpolate(
      progressSV.value,
      [0, 1],
      [previousFontSizeSV.value, nextFontSizeSV.value]
    );
  });

  const animatedStyle = useAnimatedStyle(() => ({
    fontSize: animatedFontSize.value
  }));

  return (
    <View
      style={{
        width: '100%',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: PADDING / 2
      }}
      onLayout={onTextContainerLayout}
    >
      <Animated.Text
        style={[
          {
            fontFamily: 'Onest600SemiBold',
            color: COLORS.textPrimary,
            textAlign: 'center',
            width: '100%'
          },
          animatedStyle
        ]}
        numberOfLines={1}
      >
        {amount || '0'}
      </Animated.Text>
    </View>
  );
};
