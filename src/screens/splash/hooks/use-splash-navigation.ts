import { useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAllContactsQuery } from '@core/contacts/lib';
import {
  useCurrenciesQuery,
  useRodeoTokensListQuery
} from '@lib/hooks/queries';
import { ROOT_STACK_ROUTES, RootNavigationProp } from '@navigation/root-stack';

export function useSplashNavigation() {
  const navigation = useNavigation<RootNavigationProp>();
  const { loading: loadingCurrencies } = useCurrenciesQuery();
  const { loading: loadingRodeoTokens } = useRodeoTokensListQuery();
  const { loading: loadingContacts } = useAllContactsQuery();

  // TODO: Temp mock of signed in state
  const isSignedIn = true;

  const loading = useMemo(
    () => loadingCurrencies || loadingRodeoTokens || loadingContacts,
    [loadingContacts, loadingCurrencies, loadingRodeoTokens]
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
