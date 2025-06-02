import { useCallback, useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RowContainer, TextInput, Typography } from '@components/atoms';
import { QRIcon } from '@components/svgs';
import {
  ANIMATION_DELAY,
  AppValidators,
  COLORS,
  DEVICE_WIDTH,
  FONT_SIZE
} from '@constants';
import { useQRScanner } from '@lib';
import { RootNavigationProp } from '@navigation/root-stack';
import { devErrorLogger, StringUtils } from '@utils';
import { styles } from './styles';

interface AddressInputWithQRProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}

const getSliceNumbers = (width: number, fontSize: number) => {
  const totalCharacters = Math.floor(width / fontSize);
  const halfCharacters = Math.floor(totalCharacters / 2);
  const leftSlice = halfCharacters + 9;
  const rightSlice = totalCharacters - leftSlice + 9;
  return { leftSlice, rightSlice };
};

export const AddressInputWithQR = ({
  label,
  value,
  onChangeText
}: AddressInputWithQRProps) => {
  const navigation = useNavigation<RootNavigationProp>();
  const { setQRCallback } = useQRScanner();

  const [isInputFocused, setIsInputFocused] = useState(false);

  const toggleFocused = () => setIsInputFocused((prevState) => !prevState);

  useEffect(() => {
    return () => {
      setQRCallback(null);
    };
  }, [setQRCallback]);

  const maskedValue = useMemo(() => {
    const isAddress = AppValidators.ethereumAddress.test(value);
    if (isInputFocused || !isAddress) return value;

    const { leftSlice, rightSlice } = getSliceNumbers(DEVICE_WIDTH, 16);
    return StringUtils.formatAddress(value, leftSlice, rightSlice);
  }, [value, isInputFocused]);

  const onScannedValueHandle = useCallback(
    (payload: string) => {
      if (!payload) return;

      const isAddress = AppValidators.ethereumAddress.test(payload);
      const extractedAddress = payload.match(
        AppValidators.ethereumAddress
      )?.[0];

      if (isAddress && extractedAddress) {
        onChangeText(extractedAddress);
      } else {
        devErrorLogger(
          'Invalid Address',
          'The scanned QR code does not contain a valid Ethereum address'
        );
      }
    },
    [onChangeText]
  );

  const onScannerNavigate = useCallback(() => {
    setQRCallback(onScannedValueHandle);
    setTimeout(() => {
      navigation.navigate('QRScanner');
    }, ANIMATION_DELAY);
  }, [navigation, onScannedValueHandle, setQRCallback]);

  return (
    <View style={styles.container}>
      <Typography
        fontSize={FONT_SIZE.body.md}
        fontFamily="Onest500Medium"
        color={COLORS.textPrimary}
      >
        {label}
      </Typography>

      <RowContainer alignItems="center" gap={8}>
        <TextInput
          value={maskedValue}
          numberOfLines={1}
          maxLength={64}
          onFocus={toggleFocused}
          onBlur={toggleFocused}
          style={styles.input}
          onChangeText={onChangeText}
          placeholderTextColor={COLORS.neutral400}
          placeholder="Wallet address, Phone or Email"
        />

        <TouchableOpacity hitSlop={10} onPress={onScannerNavigate}>
          <QRIcon />
        </TouchableOpacity>
      </RowContainer>
    </View>
  );
};
