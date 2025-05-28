import { useState, useRef, useCallback, useEffect } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Typography } from '@components/atoms';
import { COLORS } from '@constants';
import { useSendFundsStore } from '@core/send-funds/model';
import { devLogger, moderateScale } from '@utils';
import { styles } from './styles';

const OUTER_PADDING_HORIZONTAL = 10;
const INNER_SCROLL_PADDING_HORIZONTAL = 5;

export const SendFundsAnimatedAmount = () => {
  const { amount } = useSendFundsStore();

  useEffect(() => {
    devLogger('amount', amount);
  }, [amount]);

  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const scrollViewInternalWidth =
    containerWidth > 0 ? containerWidth - 2 * OUTER_PADDING_HORIZONTAL : 0;

  const handleAmountContainerLayout = useCallback(
    (event: LayoutChangeEvent) => {
      setContainerWidth(event.nativeEvent.layout.width);
    },
    []
  );

  const handleTextContentLayout = useCallback((event: LayoutChangeEvent) => {
    setTextWidth(event.nativeEvent.layout.width);
  }, []);

  useEffect(() => {
    if (
      scrollViewRef.current &&
      containerWidth > 0 &&
      scrollViewInternalWidth > 0
    ) {
      const contentToScrollWidth =
        textWidth + 2 * INNER_SCROLL_PADDING_HORIZONTAL;

      if (contentToScrollWidth > scrollViewInternalWidth) {
        scrollViewRef.current.scrollToEnd?.({ animated: true });
      } else {
        scrollViewRef.current.scrollTo?.({ x: 0, y: 0, animated: true });
      }
    }
  }, [textWidth, containerWidth, scrollViewInternalWidth]);

  return (
    <View
      style={[
        styles.amountContainer,
        {
          overflow: 'hidden',
          paddingHorizontal: OUTER_PADDING_HORIZONTAL
        }
      ]}
      onLayout={handleAmountContainerLayout}
    >
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          alignItems: 'center',
          flexGrow: 1,
          justifyContent:
            textWidth <= scrollViewInternalWidth ? 'center' : 'flex-start',
          paddingHorizontal: INNER_SCROLL_PADDING_HORIZONTAL
        }}
      >
        <View
          style={{ flexDirection: 'row' }}
          onLayout={handleTextContentLayout}
        >
          <Typography
            fontSize={moderateScale(56)}
            fontFamily="Onest600SemiBold"
            color={COLORS.textPrimary}
            numberOfLines={1}
          >
            {amount || '0'}
          </Typography>
        </View>
      </Animated.ScrollView>
    </View>
  );
};
