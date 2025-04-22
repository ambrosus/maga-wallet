import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ROOT_STACK_ROUTES } from '@navigation/root-stack/routes';
import { RootNavigationProp } from '@navigation/root-stack/types';

let hasNavigatedGlobally = false;

export function useFakeTimer() {
  const navigation = useNavigation<RootNavigationProp>();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (hasNavigatedGlobally) return;

    timeoutRef.current = setTimeout(() => {
      hasNavigatedGlobally = true;
      navigation.replace(ROOT_STACK_ROUTES.SplashScreen);
    }, 2000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [navigation]);
}
