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
  SETTINGS_STACK_ROUTES,
  SettingsTabParamsList
} from '@navigation/tabs';

/**
 * Parameter list for the tabs navigation stack.
 * Defines all available screens and their respective prop types.
 */
export type TabsStackParamsList = {
  Home: undefined;
  Discover: undefined;
  Settings: undefined;
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
  | SETTINGS_STACK_ROUTES;
