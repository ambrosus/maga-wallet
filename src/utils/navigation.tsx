import {
  DISCOVER_STACK_ROUTES,
  HISTORY_STACK_ROUTES,
  HOME_STACK_ROUTES
} from '@navigation/tabs';
import { RoutesModel } from '@navigation/tabs-stacks/types';

const TabVisibleRoutes = [
  HOME_STACK_ROUTES.HomeScreen,
  DISCOVER_STACK_ROUTES.DiscoverScreen,
  HISTORY_STACK_ROUTES.HistoryScreen
];

const getTabBarVisibility = (route: RoutesModel): boolean => {
  return TabVisibleRoutes.includes(route);
};

export const NavigationUtils = {
  getTabBarVisibility
};
