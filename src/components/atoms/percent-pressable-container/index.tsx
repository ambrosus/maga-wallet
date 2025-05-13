import { memo, useCallback } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Typography } from '@components/atoms';
import { Button } from '@components/molecules';
import { COLORS } from '@constants';
import { styles } from './styles';

interface PercentPressableContainerProps {
  value: number;
  onPress: (percentage: number) => void;
  style?: StyleProp<ViewStyle>;
  typographyStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export const PercentPressableContainer = memo(
  ({
    value,
    onPress,
    style,
    typographyStyle,
    disabled
  }: PercentPressableContainerProps) => {
    const onPercentItemPress = useCallback(
      () => onPress(value),
      [onPress, value]
    );

    return (
      <Button
        disabled={disabled}
        onPress={onPercentItemPress}
        style={[styles.percentageBox, style]}
      >
        <Typography
          fontSize={16}
          fontFamily="Onest500Medium"
          color={COLORS.neutral800}
          style={typographyStyle}
        >
          {value}%
        </Typography>
      </Button>
    );
  }
);
