import { ReactNode } from 'react';
import { View } from 'react-native';
import { RowContainer, Spacer, Typography } from '@components/atoms';
import { COLORS, FONT_SIZE } from '@constants';
import { styles } from './styles';

interface SetupPasskeyRowItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const SetupPasskeyRowItem = ({
  icon,
  title,
  description
}: SetupPasskeyRowItemProps) => {
  return (
    <RowContainer gap={12} alignItems="center">
      <View style={styles.iconContainer}>{icon}</View>

      <View>
        <Typography
          fontSize={FONT_SIZE.body.lg}
          fontFamily="Onest600SemiBold"
          color={COLORS.textPrimary}
        >
          {title}
        </Typography>
        <Spacer value={4} />
        <Typography
          fontSize={FONT_SIZE.body.md}
          fontFamily="Onest500Medium"
          color={COLORS.textSecondary}
        >
          {description}
        </Typography>
      </View>
    </RowContainer>
  );
};
