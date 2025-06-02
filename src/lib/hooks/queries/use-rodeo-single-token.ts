import { useQuery } from '@apollo/client';
import { AppValidators } from '@constants';
import { AMBRODEO_TOKEN } from '@graph/rodeo-tokens';
import { RodeoToken } from '@graph/rodeo-tokens/types';
import { ApolloEndpointsKeys } from '@lib/apollo';

export function useRodeoSingleTokenQuery(id: string | undefined) {
  const { data, loading } = useQuery<{ token: RodeoToken }>(AMBRODEO_TOKEN, {
    context: { apiName: ApolloEndpointsKeys.AMBRODEO_TOKENS },
    variables: { id: id?.toLowerCase() },
    skip: !id || AppValidators.ethereumAddress.test(id) === false,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network'
  });

  return { data, loading };
}
