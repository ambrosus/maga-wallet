import { ReactElement } from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { AppLogo } from '@components/svgs';
import { COLORS } from '@constants';
import { styles } from './styles';

const QR_CONFIG = {
  size: 250,
  quietZone: 10,
  ecl: 'H' as const
} as const;

interface QRCodeWithLogoProps {
  value: string;
  showLogo?: boolean;
  logo?: boolean | ReactElement;
  testID?: string;
}

export const QRCodeBox = ({
  value,
  showLogo,
  logo,
  testID
}: QRCodeWithLogoProps) => (
  <View style={styles.wrapper} testID={testID}>
    <QRCode
      value={value}
      color={COLORS.textPrimary}
      backgroundColor="white"
      {...QR_CONFIG}
    />
    {showLogo && (
      <View style={styles.logoWrapper}>
        {logo || <AppLogo color={COLORS.primary500} />}
      </View>
    )}
  </View>
);
