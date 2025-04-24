import {
  createNativeStackNavigator,
  NativeStackNavigationOptions
} from '@react-navigation/native-stack';
import { TabsNavigator } from '@navigation/tabs-stacks';
import {
  SplashScreen,
  AuthScreen,
  SetupPasskeyScreen,
  CreateWalletLoadingScreen
} from '@screens';
import { ROOT_STACK_ROUTES } from './routes';
import { RootStackParamsList } from './types';

export const RootStackNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamsList>();

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={ROOT_STACK_ROUTES.SplashScreen}
        component={SplashScreen}
      />
      <Stack.Screen
        name={ROOT_STACK_ROUTES.AuthScreen}
        component={AuthScreen}
      />
      <Stack.Screen
        name={ROOT_STACK_ROUTES.SetupPasskeyScreen}
        component={SetupPasskeyScreen}
      />
      <Stack.Screen
        name={ROOT_STACK_ROUTES.CreateWalletLoadingScreen}
        component={CreateWalletLoadingScreen}
      />
      <Stack.Screen name={ROOT_STACK_ROUTES.Tabs} component={TabsNavigator} />
    </Stack.Navigator>
  );
};
