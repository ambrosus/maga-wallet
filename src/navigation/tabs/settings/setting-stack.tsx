import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsScreen } from '@screens';
import {
  SETTINGS_STACK_ROTES,
  SettingsTabParamsList
} from './settings-tab.model';

const Stack = createNativeStackNavigator<SettingsTabParamsList>();
export const SettingsStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={SETTINGS_STACK_ROTES.SettingsScreen}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name={SETTINGS_STACK_ROTES.SettingsScreen}
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default SettingsStack;
