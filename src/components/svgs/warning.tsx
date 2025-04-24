import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

export const WarningIcon = ({
  scale = 1,
  color = COLORS.warning500
}: SvgIconProps) => {
  const size = 32 * scale;
  return (
    <Svg width={size} height={size} viewBox="0 0 33 32" fill="none">
      <Path
        d="M16.5 29.3334C9.13616 29.3334 3.16663 23.3638 3.16663 16C3.16663 8.63622 9.13616 2.66669 16.5 2.66669C23.8637 2.66669 29.8333 8.63622 29.8333 16C29.8333 23.3638 23.8637 29.3334 16.5 29.3334ZM15.1666 20V22.6667H17.8333V20H15.1666ZM15.1666 9.33335V17.3334H17.8333V9.33335H15.1666Z"
        fill={color}
      />
    </Svg>
  );
};
