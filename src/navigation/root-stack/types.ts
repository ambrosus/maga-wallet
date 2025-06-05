import { NavigatorScreenParams } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import { Contact } from '@core/contacts/types';
import {
  DiscoverTabParamsList,
  HomeTabParamsList,
  SettingsTabParamsList,
  HistoryTabParamsList
} from '@navigation/tabs';
import { TabsStackParamsList } from '@navigation/tabs-stacks/types';

/**
 * Parameter list for the root navigation stack.
 * Defines all available screens and their respective prop types.
 */
export type RootStackParamsList = {
  QRScanner: undefined;
  SplashScreen: undefined;
  AuthScreen: undefined;
  SetupPasskeyScreen: undefined;
  CreateWalletLoadingScreen: undefined;
  SettingsStack: undefined;
  Tabs: NavigatorScreenParams<TabsStackParamsList>;
  AddContactScreen: { screenType?: 'add' | 'edit'; contact?: Contact };
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
