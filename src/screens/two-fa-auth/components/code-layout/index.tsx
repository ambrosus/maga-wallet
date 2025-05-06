import { Ref } from 'react';
import { OtpInput, OtpInputRef } from 'react-native-otp-entry';
import Animated from 'react-native-reanimated';
import { Typography } from '@components';
import { COLORS } from '@constants';
import { useShakeAnimation } from '@styles';
import { scale } from '@utils';
import { styles } from './styles';

interface CodeLayoutProps {
  codeLenght?: number;
  error?: string;
  onFilled: (val: string) => void;
  onTextChange: (val: string) => void;
  ref?: Ref<OtpInputRef>;
}

export const CodeLayout = ({
  codeLenght = 6,
  error,
  onFilled,
  onTextChange,
  ref
}: CodeLayoutProps) => {
  const { animatedStyle } = useShakeAnimation();

  return (
    <>
      <Animated.View style={[styles.otpWrapper, animatedStyle]}>
        <OtpInput
          ref={ref}
          numberOfDigits={codeLenght}
          onTextChange={onTextChange}
          focusColor={error ? COLORS.destructive500 : COLORS.primary500}
          autoFocus
          onFilled={onFilled}
          theme={{
            pinCodeContainerStyle: {
              ...styles.otpContainer,
              borderColor: error ? COLORS.destructive500 : COLORS.neutral300
            },
            pinCodeTextStyle: styles.otpText,
            focusedPinCodeContainerStyle: {
              borderColor: error ? COLORS.destructive500 : COLORS.primary500
            }
          }}
        />
      </Animated.View>
      <Typography
        align="center"
        color={COLORS.destructive500}
        fontSize={scale(14)}
        style={styles.errorText}
      >
        {error || ' '}
      </Typography>
    </>
  );
};
