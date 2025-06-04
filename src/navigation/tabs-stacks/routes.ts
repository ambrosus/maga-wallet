import { TabsStackParamsList } from './types';

export const TABS_STACK_ROUTES = {
  Home: 'Home',
  Discover: 'Discover',
  History: 'History',
  Settings: 'Settings'
} as Record<keyof TabsStackParamsList, keyof TabsStackParamsList>;
