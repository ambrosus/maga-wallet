import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@screens/home';
import {
  DISCOVER_STACK_ROTES,
  DiscoverTabParamsList
} from './discover-tab.model';

const Stack = createNativeStackNavigator<DiscoverTabParamsList>();
export const DiscoverStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={DISCOVER_STACK_ROTES.DiscoverScreen}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name={DISCOVER_STACK_ROTES.DiscoverScreen}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default DiscoverStack;
