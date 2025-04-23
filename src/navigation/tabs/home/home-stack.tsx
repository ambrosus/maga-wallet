import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@screens/home';
import { HOME_STACK_ROTES, HomeTabParamsList } from './home-tab.model';

const Stack = createNativeStackNavigator<HomeTabParamsList>();
export const HomeStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={HOME_STACK_ROTES.HomeScreen}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name={HOME_STACK_ROTES.HomeScreen}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
