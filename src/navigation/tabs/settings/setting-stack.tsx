import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SETTINGS_STACK_ROUTES, SettingsTabParamsList } from '@navigation';
import {
  AboutScreen,
  AddressBookScreen,
  ManageAccountsScreen,
  NotificationsScreen,
  PreferencesScreen,
  SecurityScreen,
  SettingsScreen
} from '@screens';
import {
  ConfirmNewPasscode,
  CreaateNewPasscode,
  EnterPasscode
} from '@screens/passcode';
import {
  TwoFAPrepare,
  TwoFASetup,
  TwoFAVerify,
  VerifyIndentify
} from '@screens/two-fa-auth';

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

        {/* PASSCODE */}
        <Stack.Screen
          name={SETTINGS_STACK_ROUTES.CreateNewPasscode}
          component={CreaateNewPasscode}
        />
        <Stack.Screen
          name={SETTINGS_STACK_ROUTES.ConfirmNewPasscode}
          component={ConfirmNewPasscode}
        />
        <Stack.Screen
          name={SETTINGS_STACK_ROUTES.EnterPasscode}
          component={EnterPasscode}
        />

        {/* 2 FA */}

        <Stack.Screen
          name={SETTINGS_STACK_ROUTES.VerifyIdentify}
          component={VerifyIndentify}
        />
        <Stack.Screen
          name={SETTINGS_STACK_ROUTES.TwoFAPrepare}
          component={TwoFAPrepare}
        />
        <Stack.Screen
          name={SETTINGS_STACK_ROUTES.TwoFASetup}
          component={TwoFASetup}
        />
        <Stack.Screen
          name={SETTINGS_STACK_ROUTES.TwoFAVerify}
          component={TwoFAVerify}
        />
      </Stack.Navigator>
    </>
  );
};

export default SettingsStack;
