import { useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ROOT_STACK_ROUTES, RootNavigationProp } from '@navigation/root-stack';
import { useCurrenciesQuery } from '@queries/currencies';
import { useRodeoTokensListQuery } from '@queries/rodeo-tokens/use-rodeo-tokens.query';

export function useSplashNavigation() {
  const { loading: loadingCurrencies } = useCurrenciesQuery();
  const { loading: loadingRodeoTokens } = useRodeoTokensListQuery();
  const navigation = useNavigation<RootNavigationProp>();

  // TODO: Temp mock of signed in state
  const isSignedIn = true;

  const loading = useMemo(
    () => loadingCurrencies || loadingRodeoTokens,
    [loadingCurrencies, loadingRodeoTokens]
  );

  useEffect(() => {
    if (loading) return;
    const timeoutId = setTimeout(() => {
      navigation.replace(
        isSignedIn ? ROOT_STACK_ROUTES.Tabs : ROOT_STACK_ROUTES.AuthScreen
      );
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isSignedIn, loading, navigation]);
}
