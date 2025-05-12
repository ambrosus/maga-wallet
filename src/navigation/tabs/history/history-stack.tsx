import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HISTORY_STACK_ROUTES, HistoryTabParamsList } from '@navigation/tabs';
import { HistoryScreen } from '@screens';

export const HistoryStack = () => {
  const Stack = createNativeStackNavigator<HistoryTabParamsList>();

  return (
    <>
      <Stack.Navigator
        initialRouteName={HISTORY_STACK_ROUTES.HistoryScreen}
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen
          name={HISTORY_STACK_ROUTES.HistoryScreen}
          component={HistoryScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default HistoryStack;
