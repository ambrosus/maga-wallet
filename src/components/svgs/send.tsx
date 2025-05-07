import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

export const SendIcon = ({
  color = COLORS.neutral900,
  scale = 1
}: SvgIconProps) => {
  const size = 24 * scale;
  return (
    <Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
      <Path
        d="M20.735 5.68597C21.167 4.49097 20.009 3.33297 18.814 3.76597L4.20898 9.04797C3.00998 9.48197 2.86498 11.118 3.96798 11.757L8.62998 14.456L12.793 10.293C12.9816 10.1108 13.2342 10.01 13.4964 10.0123C13.7586 10.0146 14.0094 10.1197 14.1948 10.3051C14.3802 10.4906 14.4854 10.7414 14.4877 11.0036C14.4899 11.2658 14.3891 11.5184 14.207 11.707L10.044 15.87L12.744 20.532C13.382 21.635 15.018 21.489 15.452 20.291L20.735 5.68597Z"
        fill={color}
      />
    </Svg>
  );
};
