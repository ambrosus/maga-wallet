import { memo, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Typography } from '@components/atoms';
import { Button } from '@components/molecules';
import { COLORS } from '@constants';
import { styles } from './styles';

interface PercentPressableContainerProps {
  percentage: number;
  onPress: (percentage: number) => void;
  style?: StyleProp<ViewStyle>;
}

export const PercentPressableContainer = memo(
  ({ percentage, onPress, style }: PercentPressableContainerProps) => {
    const onPercentItemPress = useCallback(
      () => onPress(percentage),
      [onPress, percentage]
    );

    return (
      <Button
        onPress={onPercentItemPress}
        style={[styles.percentageBox, style]}
      >
        <Typography
          fontSize={16}
          fontFamily="Onest500Medium"
          color={COLORS.neutral800}
        >
          {percentage}%
        </Typography>
      </Button>
    );
  }
);
