import { ReactNode } from 'react';
import { SETTINGS_STACK_ROUTES } from '@navigation';

export enum Settingsitems {
  ManageAccounts = 'Manage Accounts',
  Security = 'Security',
  AddressBook = 'Address Book',
  Preferences = 'Preferences',
  Notifications = 'Notifications',
  About = 'About'
}

export interface SettingItem {
  name: Settingsitems;
  route: SETTINGS_STACK_ROUTES;
  icon: ReactNode;
}
