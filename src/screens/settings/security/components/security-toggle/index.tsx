import { View } from 'react-native';
import { Spacer, ToggleSwitch, Typography } from '@components';
import { COLORS } from '@constants';
import { scale } from '@utils';
import { styles } from '../../styles';

interface SecurityToggleItemProps {
  label: string;
  value: boolean;
  onValueChange: () => void;
  description?: string;
}

export const SecurityToggleItem = ({
  label,
  value,
  onValueChange,
  description
}: SecurityToggleItemProps) => (
  <View style={styles.securityItem}>
    <View style={styles.securityItemWrapper}>
      <Typography color={COLORS.textPrimary}>{label}</Typography>
      {description && (
        <>
          <Spacer value={scale(5)} />
          <Typography fontSize={scale(12)} color={COLORS.textSecondary}>
            {description}
          </Typography>
        </>
      )}
    </View>
    <ToggleSwitch
      style={styles.toogleSwitcher}
      value={value}
      onValueChange={onValueChange}
    />
  </View>
);
