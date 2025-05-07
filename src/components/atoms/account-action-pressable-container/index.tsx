import { ReactNode, useMemo, useRef } from 'react';
import { Pressable, Animated } from 'react-native';
import { capitalize } from 'lodash';
import { ReceiveIcon, SendIcon, SwapIcon } from '@components/svgs';
import { COLORS, Config, FONT_SIZE } from '@constants';
import { styles } from './styles';
import { Typography } from '../typography';

type AccountActions = 'swap' | 'send' | 'receive';

interface AccountActionPressableContainerProps {
  type: AccountActions;
  onActionPress: () => void;
}

export const AccountActionPressableContainer = ({
  type,
  onActionPress
}: AccountActionPressableContainerProps) => {
  const disabled = useMemo(() => !Config.actions[type], [type]);
  const opacityAnim = useRef(new Animated.Value(disabled ? 0.5 : 1)).current;

  const icons: Record<AccountActions, ReactNode> = useMemo(
    () => ({
      swap: <SwapIcon />,
      send: <SendIcon />,
      receive: <ReceiveIcon />
    }),
    []
  );

  const animateOpacity = (toValue: number) => {
    Animated.timing(opacityAnim, {
      toValue,
      duration: 75,
      useNativeDriver: true
    }).start();
  };

  return (
    <Animated.View style={{ opacity: opacityAnim }}>
      <Pressable
        disabled={disabled}
        onPress={onActionPress}
        onPressIn={() => animateOpacity(0.5)}
        onPressOut={() => animateOpacity(1)}
        style={styles.container}
      >
        {icons[type]}
        <Typography
          fontSize={FONT_SIZE.body.md}
          fontFamily="Onest500Medium"
          color={COLORS.neutral700}
        >
          {capitalize(type)}
        </Typography>
      </Pressable>
    </Animated.View>
  );
};
