import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

export const ReceiveIcon = ({
  color = COLORS.neutral900,
  scale = 1
}: SvgIconProps) => {
  const size = 24 * scale;
  return (
    <Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
      <Path
        d="M13.5001 1.99977L11.5002 1.99963V18.1715L7.55044 14.2218L6.13623 15.636L12.5002 22L18.8642 15.636L17.4499 14.2218L13.5002 18.1716L13.5001 1.99977Z"
        fill={color}
      />
    </Svg>
  );
};
