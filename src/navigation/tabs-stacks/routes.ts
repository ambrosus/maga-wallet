import { TabsStackParamsList } from './types';

export const TABS_STACK_ROTES = {
  Home: 'Home',
  Discover: 'Discover',
  Settings: 'Settings'
} as Record<keyof TabsStackParamsList, keyof TabsStackParamsList>;
