import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@constants';
import { SvgIconProps } from '@types';

export const ShieldIcon = ({
  scale = 1,
  color = COLORS.primary500
}: SvgIconProps) => {
  const size = 32 * scale;

  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M12 15.9999L14.6667 18.6666L20 13.3333M26.6667 17.3333C26.6667 23.9999 22 27.3333 16.4533 29.2666C16.1629 29.365 15.8474 29.3603 15.56 29.2533C10 27.3333 5.33334 23.9999 5.33334 17.3333V7.99995C5.33334 7.64633 5.47382 7.30719 5.72387 7.05714C5.97392 6.80709 6.31305 6.66662 6.66668 6.66662C9.33334 6.66662 12.6667 5.06661 14.9867 3.03995C15.2692 2.79861 15.6285 2.66602 16 2.66602C16.3715 2.66602 16.7309 2.79861 17.0133 3.03995C19.3467 5.07995 22.6667 6.66662 25.3333 6.66662C25.687 6.66662 26.0261 6.80709 26.2762 7.05714C26.5262 7.30719 26.6667 7.64633 26.6667 7.99995V17.3333Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
