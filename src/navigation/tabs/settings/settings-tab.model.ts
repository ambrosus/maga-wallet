import { Settingsitems } from '@screens/settings/models';

export type SettingsTabParamsList = {
  SettingsScreen: undefined;
  ManageAccountsScreen: { name: Settingsitems };
  SecurityScreen: { name: Settingsitems };
  AddressBookScreen: { name: Settingsitems };
  PreferencesScreen: { name: Settingsitems };
  NotificationsScreen: { name: Settingsitems };
  AboutScreen: { name: Settingsitems };
  CreateNewPasscode: undefined;
  ConfirmNewPasscode: { passcode: string };
  EnterPasscode: { onPasscodeSuccess?: () => void };
  VerifyIdentify: undefined;
  TwoFAPrepare: undefined;
  TwoFASetup: undefined;
  TwoFAVerify: { onVerify?: () => void };
};

export enum SETTINGS_STACK_ROUTES {
  SettingsScreen = 'SettingsScreen',
  ManageAccountsScreen = 'ManageAccountsScreen',
  SecurityScreen = 'SecurityScreen',
  AddressBookScreen = 'AddressBookScreen',
  PreferencesScreen = 'PreferencesScreen',
  NotificationsScreen = 'NotificationsScreen',
  AboutScreen = 'AboutScreen',
  CreateNewPasscode = 'CreateNewPasscode',
  ConfirmNewPasscode = 'ConfirmNewPasscode',
  EnterPasscode = 'EnterPasscode',
  VerifyIdentify = 'VerifyIdentify',
  TwoFAPrepare = 'TwoFAPrepare',
  TwoFASetup = 'TwoFASetup',
  TwoFAVerify = 'TwoFAVerify'
}
