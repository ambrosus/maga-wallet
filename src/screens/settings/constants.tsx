import {
  SettingsIconWallet,
  SettingsIconSecurity,
  SettingsIconProfile,
  SettingsIconSettings,
  SettingsIconNotification,
  SettingsIconInfo
} from '@components/svgs';
import { SETTINGS_STACK_ROUTES } from '@navigation';
import { SettingItem, Settingsitems } from './models';

export const SETTINGS_ITEMS: SettingItem[] = [
  {
    name: Settingsitems.ManageAccounts,
    route: SETTINGS_STACK_ROUTES.ManageAccountsScreen,
    icon: <SettingsIconWallet />
  },
  {
    name: Settingsitems.Security,
    route: SETTINGS_STACK_ROUTES.SecurityScreen,
    icon: <SettingsIconSecurity />
  },
  {
    name: Settingsitems.AddressBook,
    route: SETTINGS_STACK_ROUTES.AddressBookScreen,
    icon: <SettingsIconProfile />
  },
  {
    name: Settingsitems.Preferences,
    route: SETTINGS_STACK_ROUTES.PreferencesScreen,
    icon: <SettingsIconSettings />
  },
  {
    name: Settingsitems.Notifications,
    route: SETTINGS_STACK_ROUTES.NotificationsScreen,
    icon: <SettingsIconNotification />
  },
  {
    name: Settingsitems.About,
    route: SETTINGS_STACK_ROUTES.AboutScreen,
    icon: <SettingsIconInfo />
  }
];
