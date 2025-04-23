import { RootStackParamsList } from './types';

export const ROOT_STACK_ROUTES = {
  SplashScreen: 'SplashScreen',
  AuthScreen: 'AuthScreen'
} as Record<keyof RootStackParamsList, keyof RootStackParamsList>;
