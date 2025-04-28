import { ReactNode } from 'react';
import { SettingsTabParamsList } from '@navigation';

export enum Settingsitems {
  ManageAccounts = 'manage.accounts',
  Security = 'security',
  AddressBook = 'address.book',
  Preferences = 'preferences',
  Notifications = 'notifications',
  About = 'about'
}

export interface SettingItem {
  name: Settingsitems;
  route: keyof Omit<SettingsTabParamsList, 'SettingsScreen'>;
  icon: ReactNode;
}
