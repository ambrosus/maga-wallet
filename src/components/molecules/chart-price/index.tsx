import { RowContainer, Spacer, Typography } from '@components/atoms';
import { ChartArrow } from '@components/svgs';
import { COLORS, FONT_SIZE } from '@constants';
import { NumberUtils, scale } from '@utils';

interface ChartPriceProps {
  percentChange: number;
  priceUSD: number;
}

export const ChartPrice = ({ percentChange, priceUSD }: ChartPriceProps) => {
  const orientation = percentChange >= 0 ? 'up' : 'down';
  const color = percentChange >= 0 ? COLORS.success700 : COLORS.destructive700;
  return (
    <RowContainer justifyContent="center" alignItems="center">
      <Typography fontSize={FONT_SIZE.tertiary.lg} color={COLORS.neutral400}>
        ${NumberUtils.limitDecimalCount(priceUSD, 7)}
      </Typography>
      <Spacer horizontal value={scale(5)} />
      <ChartArrow orientation={orientation} color={color} />
      <Spacer horizontal value={scale(5)} />
      <Typography fontSize={FONT_SIZE.tertiary.lg} color={color}>
        {percentChange}%
      </Typography>
    </RowContainer>
  );
};
