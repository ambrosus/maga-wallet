import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import { DiscoverTabParamsList } from '@navigation/tabs/discover/discover-tab.model';
import { HomeTabParamsList } from '@navigation/tabs/home/home-tab.model';
import { SettingsTabParamsList } from '@navigation/tabs/settings/settings-tab.model';

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
