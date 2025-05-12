import { TabsStackParamsList } from './types';

export const TABS_STACK_ROUTES = {
  Home: 'Home',
  Discover: 'Discover',
  History: 'History'
} as Record<keyof TabsStackParamsList, keyof TabsStackParamsList>;
