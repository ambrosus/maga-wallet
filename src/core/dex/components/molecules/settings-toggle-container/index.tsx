import { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { RowContainer, Switch, Typography } from '@components/atoms';
import { FONT_SIZE, COLORS } from '@constants';
import { scale } from '@utils';
import { styles } from './styles';

interface SettingsToggleContainerProps {
  heading: string;
  description?: string;
  value: boolean;
  onToggle: (payload: boolean) => void;
  borderBottom?: boolean;
}

export const SettingsToggleContainer = ({
  heading,
  description,
  value,
  onToggle,
  borderBottom = false
}: SettingsToggleContainerProps) => {
  const borderBottomStyles: StyleProp<ViewStyle> = useMemo(
    () => ({
      borderBottomWidth: borderBottom ? 1 : 0,
      borderBottomColor: COLORS.neutral200
    }),
    [borderBottom]
  );

  return (
    <RowContainer
      alignItems="center"
      justifyContent="space-between"
      style={{ ...styles.container, ...borderBottomStyles }}
    >
      <View style={styles.innerContainer}>
        <Typography
          fontSize={FONT_SIZE.body.md}
          fontFamily="Onest500Medium"
          color={COLORS.textPrimary}
        >
          {heading}
        </Typography>
        {description && (
          <Typography fontSize={scale(10)} color={COLORS.textSecondary}>
            {description}
          </Typography>
        )}
      </View>

      <Switch value={value} onValueChange={onToggle} />
    </RowContainer>
  );
};
