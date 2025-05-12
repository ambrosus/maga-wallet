import { DiscoverIcon, HistoryIcon, HomeIcon } from '@components/svgs';
import { COLORS } from '@constants';

export const MAIN_TABS = {
  Home: {
    inactiveIcon: <HomeIcon />,
    activeIcon: <HomeIcon color={COLORS.primary500} />
  },
  History: {
    inactiveIcon: <HistoryIcon />,
    activeIcon: <HistoryIcon color={COLORS.primary500} />
  },
  Discover: {
    inactiveIcon: <DiscoverIcon />,
    activeIcon: <DiscoverIcon color={COLORS.primary500} />
  }
};
