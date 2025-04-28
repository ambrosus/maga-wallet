import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@screens/home';
import { HOME_STACK_ROUTES, HomeTabParamsList } from './home-tab.model';

export const HomeStack = () => {
  const Stack = createNativeStackNavigator<HomeTabParamsList>();

  return (
    <>
      <Stack.Navigator
        initialRouteName={HOME_STACK_ROUTES.HomeScreen}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name={HOME_STACK_ROUTES.HomeScreen}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
