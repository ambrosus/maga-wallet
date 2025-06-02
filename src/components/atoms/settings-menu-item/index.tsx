import { View } from 'react-native';

import { Button } from '@components/molecules';
import { Arrow } from '@components/svgs';
import { COLORS } from '@constants';
import { scale } from '@utils';
import { styles } from './styles';
import { Spacer } from '../spacer';
import { Typography } from '../typography';

interface SettingsMenuItemProps {
  title: string;
  icon?: React.ReactNode;
  showSeparator: boolean;
  onPress: () => void;
  subtitle?: string | null;
  isArrow?: boolean;
  disabled?: boolean;
}

export const SettingsMenuItem = ({
  title,
  onPress,
  icon = null,
  showSeparator,
  subtitle = null,
  isArrow = true,
  disabled = false
}: SettingsMenuItemProps) => {
  const handlePress = () => {
    onPress();
  };
  const notification = 0;

  return (
    <Button
      disabled={disabled}
      style={
        showSeparator
          ? { ...styles.menuItem, ...styles.itemSeperator }
          : styles.menuItem
      }
      onPress={handlePress}
    >
      <View style={styles.menuItemWrapper}>
        <View style={styles.leftBlock}>
          {icon && (
            <>
              {icon && icon}
              <Spacer horizontal value={scale(10)} />
            </>
          )}
          <View>
            <Typography color={COLORS.neutral700}>{title}</Typography>
            {subtitle && (
              <Typography color={COLORS.neutral400}>{subtitle}</Typography>
            )}
          </View>
        </View>

        <View style={styles.rightBlock}>
          {!!notification && <Typography>{notification}</Typography>}
          <Spacer horizontal value={scale(15)} />
          {isArrow && <Arrow orientation="right" />}
        </View>
      </View>
    </Button>
  );
};
