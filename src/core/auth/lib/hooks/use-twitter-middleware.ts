/* eslint-disable camelcase */
import { useCallback } from 'react';
import { Linking } from 'react-native';
import querystring from 'query-string';
import { pipe, evolve } from 'ramda';
import { BrowserResult, InAppBrowser } from 'react-native-inappbrowser-reborn';
import { v4 as uuid } from 'uuid';
import { APP_SCHEME, isAndroid } from '@constants';
import 'react-native-get-random-values';
import { XApiService } from '@core/auth/api';
import { X_AUTHORIZATION_URL } from '@core/auth/constants';

const clientID = process.env.X_CLIENT_ID ?? '';
const clientSecret = process.env.X_CLIENT_SECRET ?? '';

const redirectUri = APP_SCHEME;

const permissions = ['offline.access', 'users.read', 'tweet.read'];

export function useTwitterMiddleware() {
  const getDeepLink = (path = '') => {
    const scheme = APP_SCHEME;
    const prefix = isAndroid ? `${scheme}://my-host/` : `${scheme}://`;
    return prefix + path;
  };

  const cleanUrlString = (state: string) => state.replace('#!', '');

  const getCodeAndStateFromUrl = pipe(
    querystring.extract,
    querystring.parse,
    evolve({ state: cleanUrlString })
  );

  const getPayloadForToken = ({
    clientID,
    clientSecret,
    code,
    redirectUriWithRedirectUrl,
    currentAuthState
  }: {
    code: string;
    clientID: string;
    clientSecret?: string;
    redirectUriWithRedirectUrl: string;
    permissions?: string[];
    currentAuthState?: string;
  }) =>
    querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUriWithRedirectUrl,
      client_id: clientID,
      client_secret: clientSecret,
      code_verifier: currentAuthState
    });

  const getAccessToken = useCallback(
    async (code: string, currentAuthState: string) => {
      const deepLink = getDeepLink('callback');
      const redirectUriWithRedirectUrl = `${redirectUri}?redirect_url=${encodeURIComponent(
        deepLink
      )}`;

      const payload: string = getPayloadForToken({
        clientID,
        clientSecret,
        code,
        redirectUriWithRedirectUrl,
        currentAuthState
      });

      const token = await XApiService.fetchAuthToken(payload);

      if (token.error) {
        return {};
      }
      return token;
    },
    []
  );

  const twitterAuthCallback = useCallback(async () => {
    const deepLink = getDeepLink('callback');
    const authState = uuid();
    const inappBorwserAuthURL = `${X_AUTHORIZATION_URL}?${querystring.stringify(
      {
        response_type: 'code',
        client_id: clientID,
        scope: permissions!.join(' ').trim(),
        state: authState,
        redirect_uri: `${redirectUri}?redirect_url=${encodeURIComponent(
          deepLink
        )}`,
        code_challenge: authState,
        code_challenge_method: 'plain'
      }
    )}`;

    try {
      if (await InAppBrowser.isAvailable()) {
        const response = (await InAppBrowser.openAuth(
          inappBorwserAuthURL,
          deepLink,
          {
            ephemeralWebSession: false,
            enableUrlBarHiding: true,
            enableDefaultShare: false
          }
        )) as BrowserResult & { url: string };

        const { code } = getCodeAndStateFromUrl(response.url) as {
          code: string;
        };

        const tokens = await getAccessToken(code, authState);
        const { data: user } = await XApiService.fetchUserDetails(
          tokens.access_token
        );

        return { ...tokens, user: { ...user } };
      } else {
        // Try open web browser when error occur while opening inapp browser
        Linking.openURL(inappBorwserAuthURL);
      }
    } catch {
      // Try open web browser when error occur while opening inapp browser
      Linking.openURL(inappBorwserAuthURL);
    }
  }, [getAccessToken, getCodeAndStateFromUrl]);

  return { twitterAuthCallback };
}
