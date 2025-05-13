import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import { ROOT_STACK_ROUTES } from './root-stack/routes';
import { DiscoverTabParamsList } from './tabs/discover/discover-tab.model';
import { HomeTabParamsList } from './tabs/home/types';
import { SettingsTabParamsList } from './tabs/settings/settings-tab.model';

/**
 * Parameter list for the tabs navigation stack.
 * Defines all available screens and their respective prop types.
 */
export type TabsStackParamsList = {
  Home: NavigatorScreenParams<HomeTabParamsList>;
  Discover: NavigatorScreenParams<DiscoverTabParamsList>;
  Settings: NavigatorScreenParams<SettingsTabParamsList>;
};

/**
 * Parameter list for the root navigation stack.
 * Defines all available screens and their respective prop types.
 */
export type RootStackParamsList = {
  [ROOT_STACK_ROUTES.SplashScreen]: undefined;
  [ROOT_STACK_ROUTES.AuthScreen]: undefined;
  [ROOT_STACK_ROUTES.SetupPasskeyScreen]: undefined;
  [ROOT_STACK_ROUTES.CreateWalletLoadingScreen]: undefined;
  [ROOT_STACK_ROUTES.Tabs]: NavigatorScreenParams<TabsStackParamsList>;
} & HomeTabParamsList &
  DiscoverTabParamsList &
  SettingsTabParamsList;

/**
 * Navigation prop type for the root stack.
 * Provides typed access to navigation methods for the root stack.
 */
export type RootNavigationProp = NativeStackNavigationProp<RootStackParamsList>;

/**
 * Navigation prop type for the tabs stack.
 * Provides typed access to navigation methods for the tabs stack.
 */
export type TabsNavigationProp = BottomTabNavigationProp<TabsStackParamsList>;

/**
 * Navigation prop type for the home tab.
 * Provides typed access to navigation methods for the home tab.
 */
export type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabsStackParamsList>,
  NativeStackNavigationProp<HomeTabParamsList>
>;

/**
 * Generic screen props type for components within any navigation stack.
 * @template T - The parameter list type (RootStackParamsList or TabsStackParamsList)
 * @template Route - The screen route name from the parameter list
 */
export type NavigationScreenProps<
  T extends
    | RootStackParamsList
    | TabsStackParamsList
    | HomeTabParamsList
    | DiscoverTabParamsList
    | SettingsTabParamsList,
  Route extends keyof T
> = NativeStackScreenProps<T, Route>;

/**
 * Screen props type for components within the root navigation stack.
 * @template Route - The screen route name from RootStackParamsList
 */
export type RootNavigationScreenProps<Route extends keyof RootStackParamsList> =
  NavigationScreenProps<RootStackParamsList, Route>;

/**
 * Screen props type for components within the tabs navigation stack.
 * @template Route - The screen route name from TabsStackParamsList
 */
export type TabsNavigationScreenProps<Route extends keyof TabsStackParamsList> =
  NavigationScreenProps<TabsStackParamsList, Route>;
