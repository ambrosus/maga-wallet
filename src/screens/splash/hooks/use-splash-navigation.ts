import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ROOT_STACK_ROUTES, RootNavigationProp } from '@navigation/root-stack';

export function useSplashNavigation() {
  const navigation = useNavigation<RootNavigationProp>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.replace(ROOT_STACK_ROUTES.AuthScreen);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigation]);
}
