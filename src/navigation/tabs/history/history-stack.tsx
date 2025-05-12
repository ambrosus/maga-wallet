import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HISTORY_STACK_ROUTES, HistoryTabParamsList } from '@navigation/tabs';
import { HistoryScreen } from '@screens';

export const HistoryStack = () => {
  const Stack = createNativeStackNavigator<HistoryTabParamsList>();

  return (
    <View testID="history-stack">
      <Stack.Navigator
        initialRouteName={HISTORY_STACK_ROUTES.HistoryScreen}
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen
          name={HISTORY_STACK_ROUTES.HistoryScreen}
          component={HistoryScreen}
          options={{
            headerShown: true
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default HistoryStack;
