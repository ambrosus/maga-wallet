import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsScreen } from '@screens';
import { AboutScreen } from '@screens/settings/about';
import { AddressBookScreen } from '@screens/settings/address-book';
import { ManageAccountsScreen } from '@screens/settings/manage-accounts';
import { NotificationsScreen } from '@screens/settings/notifications';
import { PreferencesScreen } from '@screens/settings/preferences';
import { SecurityScreen } from '@screens/settings/security';
import {
  SETTINGS_STACK_ROUTES,
  SettingsTabParamsList
} from './settings-tab.model';

export const SettingsStack = () => {
  const Stack = createNativeStackNavigator<SettingsTabParamsList>();

  return (
    <>
      <Stack.Navigator
        initialRouteName={SETTINGS_STACK_ROUTES.SettingsScreen}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name={SETTINGS_STACK_ROUTES.SettingsScreen}
          component={SettingsScreen}
        />
        <Stack.Screen
          name={SETTINGS_STACK_ROUTES.ManageAccountsScreen}
          component={ManageAccountsScreen}
        />
        <Stack.Screen
          name={SETTINGS_STACK_ROUTES.SecurityScreen}
          component={SecurityScreen}
        />
        <Stack.Screen
          name={SETTINGS_STACK_ROUTES.AddressBookScreen}
          component={AddressBookScreen}
        />
        <Stack.Screen
          name={SETTINGS_STACK_ROUTES.PreferencesScreen}
          component={PreferencesScreen}
        />
        <Stack.Screen
          name={SETTINGS_STACK_ROUTES.NotificationsScreen}
          component={NotificationsScreen}
        />
        <Stack.Screen
          name={SETTINGS_STACK_ROUTES.AboutScreen}
          component={AboutScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default SettingsStack;
