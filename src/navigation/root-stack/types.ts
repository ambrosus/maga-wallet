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
  SettingsTabParamsList,
  HISTORY_STACK_ROUTES,
  HistoryTabParamsList
} from '@navigation/tabs';

/**
 * Parameter list for the root navigation stack.
 * Defines all available screens and their respective prop types.
 */
export type RootStackParamsList = {
  SplashScreen: undefined;
  AuthScreen: undefined;
  SetupPasskeyScreen: undefined;
  CreateWalletLoadingScreen: undefined;
  Tabs:
    | {
        screen?:
          | HISTORY_STACK_ROUTES
          | HOME_STACK_ROUTES
          | DISCOVER_STACK_ROUTES
          | SETTINGS_STACK_ROUTES;
      }
    | undefined;
} & SettingsTabParamsList &
  HomeTabParamsList &
  DiscoverTabParamsList &
  HistoryTabParamsList;

/**
 * Navigation prop type for the root stack.
 * Provides typed access to navigation methods for the root stack.
 */
export type RootNavigationProp = NativeStackNavigationProp<RootStackParamsList>;

/**
 * Screen props type for components within the root navigation stack.
 * @template Route - The screen route name from RootStackParamsList
 */
export type RootNavigationScreenProps<Route extends keyof RootStackParamsList> =
  NativeStackScreenProps<RootStackParamsList, Route>;
