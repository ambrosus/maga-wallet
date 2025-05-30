import { TouchableOpacity, View } from 'react-native';
import { RowContainer, TextInput, Typography } from '@components/atoms';
import { QRIcon } from '@components/svgs';
import { COLORS, FONT_SIZE } from '@constants';
import { styles } from './styles';

interface AddressInputWithQRProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}

export const AddressInputWithQR = ({
  label,
  value,
  onChangeText
}: AddressInputWithQRProps) => {
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
          value={value}
          maxLength={64}
          style={styles.input}
          onChangeText={onChangeText}
          placeholderTextColor={COLORS.neutral400}
          placeholder="Wallet address, Phone or Email"
        />

        <TouchableOpacity hitSlop={10}>
          <QRIcon />
        </TouchableOpacity>
      </RowContainer>
    </View>
  );
};
