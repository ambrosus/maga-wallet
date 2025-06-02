import { Typography } from '@components/atoms';
import { COLORS } from '@constants';
import { NumberUtils } from '@utils';

interface TotalBalanceProps {
  totalBalance: number;
}

export const TotalBalance = ({ totalBalance }: TotalBalanceProps) => {
  const _totalBalance = NumberUtils.limitDecimalCount(totalBalance, 2)
    .toString()
    .split('.');

  return (
    <>
      <Typography
        fontSize={36}
        fontFamily="Onest600SemiBold"
        color={COLORS.neutral700}
      >
        ${NumberUtils.formatNumber(_totalBalance[0] ? +_totalBalance[0] : 0)}
        <Typography
          fontSize={36}
          fontFamily="Onest600SemiBold"
          color={COLORS.textTertiary}
        >
          .{NumberUtils.formatNumber(_totalBalance[1] ? +_totalBalance[1] : 0)}
        </Typography>
      </Typography>
    </>
  );
};
