import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

export const SwapIcon = ({
  color = COLORS.neutral900,
  scale = 1
}: SvgIconProps) => {
  const size = 24 * scale;
  return (
    <Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
      <Path
        d="M7.5 21.5C5.01472 21.5 3 19.4853 3 17C3 14.5147 5.01472 12.5 7.5 12.5C9.98528 12.5 12 14.5147 12 17C12 19.4853 9.98528 21.5 7.5 21.5ZM17.5 11.5C15.0147 11.5 13 9.48528 13 7C13 4.51472 15.0147 2.5 17.5 2.5C19.9853 2.5 22 4.51472 22 7C22 9.48528 19.9853 11.5 17.5 11.5ZM3.5 8C3.5 5.23858 5.73858 3 8.5 3H11.5V5H8.5C6.84315 5 5.5 6.34315 5.5 8V11H3.5V8ZM19.5 13V16C19.5 17.6569 18.1569 19 16.5 19H13.5V21H16.5C19.2614 21 21.5 18.7614 21.5 16V13H19.5Z"
        fill={color}
      />
    </Svg>
  );
};
