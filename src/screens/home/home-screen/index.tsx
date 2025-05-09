import { SafeViewContainer, Spacer, Typography } from '@components/atoms';
import { AccountActionsContainer } from '@components/molecules';
import { COLORS } from '@constants';
import { verticalScale } from '@utils';
import { styles } from './styles';

const mockedBalance = {
  integer: '1,2345',
  decimal: 0.0
};

export const HomeScreen = () => {
  return (
    <SafeViewContainer style={styles.container}>
      <Spacer value={verticalScale(64)} />
      <Typography
        fontSize={36}
        fontFamily="Onest600SemiBold"
        color={COLORS.neutral700}
      >
        ${mockedBalance.integer}
        <Typography
          fontSize={36}
          fontFamily="Onest600SemiBold"
          color={COLORS.textTertiary}
        >
          .{mockedBalance.decimal}
        </Typography>
      </Typography>
      <Spacer value={verticalScale(32)} />
      <AccountActionsContainer />
    </SafeViewContainer>
  );
};
