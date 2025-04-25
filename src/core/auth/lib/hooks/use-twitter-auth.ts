/* eslint-disable camelcase */
import { useCallback } from 'react';
import { Linking } from 'react-native';
import querystring from 'query-string';
import { pipe, evolve } from 'ramda';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { v4 as uuid } from 'uuid';
import { APP_SCHEME, isAndroid } from '@constants';
import 'react-native-get-random-values';
import {
  X_ACCESS_TOKEN_VERIFIER,
  X_AUTHORIZATION_URL
} from '@core/auth/constants';

const clientID = process.env.X_CLIENT_ID ?? '';
const clientSecret = process.env.X_CLIENT_SECRET ?? '';

const redirectUri = APP_SCHEME;

const permissions = ['offline.access', 'users.read'];

export function useTwitterAuth() {
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

  const fetchToken = async (payload: any) => {
    const response = await fetch(X_ACCESS_TOKEN_VERIFIER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload
    });
    return await response.json();
  };

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
      const token = await fetchToken(payload);

      if (token.error) {
        return {};
      }
      return token;
    },
    []
  );

  const onTwitterAuthHandle = useCallback(async () => {
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
        InAppBrowser.openAuth(inappBorwserAuthURL, deepLink, {
          ephemeralWebSession: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false
        }).then(async (response: any) => {
          const { code } = getCodeAndStateFromUrl(response.url) as {
            code: string;
          };

          return await getAccessToken(code, authState);
        });
      } else {
        Linking.openURL(inappBorwserAuthURL); // in case any error try to open the inbuilt browser
      }
    } catch {
      Linking.openURL(inappBorwserAuthURL); // in case any error try to open the inbuilt browser
    }
  }, [getAccessToken, getCodeAndStateFromUrl]);

  return { onTwitterAuthHandle };
}
