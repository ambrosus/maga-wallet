import { View } from 'react-native';
import { t } from 'i18next';
import { RowContainer, Spacer, Typography } from '@components/atoms';
import { COLORS, MOCK_USER_DATA } from '@constants';
import { scale } from '@utils';

interface UserInfoCantainerProps {
  onPressChange: () => void;
}

export const UserInfoCantainer = ({
  onPressChange
}: UserInfoCantainerProps) => (
  <RowContainer justifyContent="space-between" alignItems="center">
    <View>
      <Typography
        fontSize={scale(14)}
        fontWeight="500"
        color={COLORS.textSecondary}
      >
        {t('settings.manage.accounts.sing.method')}
      </Typography>
      <Spacer value={scale(8)} />
      <Typography
        fontSize={scale(14)}
        fontWeight="500"
        color={COLORS.textPrimary}
      >
        {MOCK_USER_DATA.email}
      </Typography>
    </View>
    <Typography
      onPress={onPressChange}
      fontSize={scale(16)}
      color={COLORS.primary500}
    >
      {t('buttons.change')}
    </Typography>
  </RowContainer>
);
