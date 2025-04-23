import {
  createNativeStackNavigator,
  NativeStackNavigationOptions
} from '@react-navigation/native-stack';
import { SplashScreen, AuthScreen } from '@screens';
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
    </Stack.Navigator>
  );
};
