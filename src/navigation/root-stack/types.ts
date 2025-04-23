import {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from '@react-navigation/native-stack';

/**
 * Parameter list for the root navigation stack.
 * Defines all available screens and their respective prop types.
 */
export type RootStackParamsList = {
  SplashScreen: undefined;
  AuthScreen: undefined;
};

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
