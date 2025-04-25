import { DISCOVER_STACK_ROUTES, SETTINGS_STACK_ROUTES } from '@navigation';
import { HOME_STACK_ROUTES } from '@navigation/tabs/home/home-tab.model';
import { RoutesModel } from '@navigation/tabs-stacks/types';

const TabVisibleRoutes = [
  HOME_STACK_ROUTES.HomeScreen,
  DISCOVER_STACK_ROUTES.DiscoverScreen,
  SETTINGS_STACK_ROUTES.SettingsScreen
];

const getTabBarVisibility = (route: RoutesModel): boolean => {
  return TabVisibleRoutes.includes(route);
};

export const NavigationUtils = {
  getTabBarVisibility
};
