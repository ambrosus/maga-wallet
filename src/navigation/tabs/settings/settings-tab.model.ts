import { Settingsitems } from '@screens/settings/models';

export type SettingsTabParamsList = {
  SettingsScreen: undefined;
  ManageAccountsScreen: { name: Settingsitems };
  SecurityScreen: { name: Settingsitems };
  AddressBookScreen: { name: Settingsitems };
  PreferencesScreen: { name: Settingsitems };
  NotificationsScreen: { name: Settingsitems };
  AboutScreen: { name: Settingsitems };
};

export enum SETTINGS_STACK_ROUTES {
  SettingsScreen = 'SettingsScreen',
  ManageAccountsScreen = 'ManageAccountsScreen',
  SecurityScreen = 'SecurityScreen',
  AddressBookScreen = 'AddressBookScreen',
  PreferencesScreen = 'PreferencesScreen',
  NotificationsScreen = 'NotificationsScreen',
  AboutScreen = 'AboutScreen'
}
