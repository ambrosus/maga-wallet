import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import {
  DISCOVER_STACK_ROUTES,
  DiscoverTabParamsList,
  HOME_STACK_ROUTES,
  HomeTabParamsList,
  HISTORY_STACK_ROUTES,
  HistoryTabParamsList
} from '@navigation/tabs';
import { SettingsTabParamsList } from '@navigation/tabs/settings/settings-tab.model';

/**
 * Parameter list for the tabs navigation stack.
 * Defines all available screens and their respective prop types.
 */
export type TabsStackParamsList = {
  Home: NavigatorScreenParams<HomeTabParamsList>;
  Discover: NavigatorScreenParams<DiscoverTabParamsList>;
  History: NavigatorScreenParams<HistoryTabParamsList>;
  Settings: NavigatorScreenParams<SettingsTabParamsList>;
};

/**
 * Screen props type for components within the root navigation stack.
 * @template Route - The screen route name from RootStackParamsList
 */
export type TabsNavigationScreenProps<Route extends keyof TabsStackParamsList> =
  NativeStackScreenProps<TabsStackParamsList, Route>;

export type TabsParamsList = {
  Home: NavigatorScreenParams<HomeTabParamsList>;
  Discover: NavigatorScreenParams<DiscoverTabParamsList>;
  History: NavigatorScreenParams<HistoryTabParamsList>;
  Settings: NavigatorScreenParams<SettingsTabParamsList>;
};

export type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamsList>,
  NativeStackNavigationProp<HomeTabParamsList>
>;

export type TabsNavigationProp = BottomTabNavigationProp<TabsParamsList>;

export type RoutesModel =
  | HOME_STACK_ROUTES
  | DISCOVER_STACK_ROUTES
  | HISTORY_STACK_ROUTES;
