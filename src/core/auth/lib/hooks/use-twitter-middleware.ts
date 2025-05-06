/* eslint-disable camelcase */
import 'react-native-get-random-values';
import auth from '@react-native-firebase/auth';
import queryString from 'query-string';
import { pipe } from 'ramda';
import {
  BrowserResult,
  InAppBrowser,
  RedirectResult
} from 'react-native-inappbrowser-reborn';
import { XApiService } from '@core/auth/api';
import { getAppDeepLink } from '@core/auth/utils';

export function useTwitterMiddleware() {
  const twitterAuthCallback = async () => {
    try {
      const { oauth_token, oauth_token_secret } =
        await XApiService.getTwitterRequestToken();

      const twitterLoginUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;
      const callbackUrl = getAppDeepLink();

      const { type, url } = (await InAppBrowser.openAuth(
        twitterLoginUrl,
        callbackUrl,
        {
          showTitle: true,
          enableUrlBarHiding: true,
          enableDefaultShare: false
        }
      )) as (RedirectResult | BrowserResult) & { url: string };

      if (type === 'success' && url) {
        const extractQueryString = (url: string) =>
          url.includes('?') ? url.split('?')[1] : '';
        const parseQuery = (qs: string) => queryString.parse(qs);

        const { oauth_token, oauth_verifier } = pipe(
          extractQueryString,
          parseQuery
        )(url) as { oauth_token: string; oauth_verifier: string };

        const accessData = await XApiService.getAccessToken(
          oauth_token,
          oauth_token_secret,
          oauth_verifier
        );

        const twitterCredential = auth.TwitterAuthProvider.credential(
          accessData.oauth_token,
          accessData.oauth_token_secret
        );

        const session = await auth().signInWithCredential(twitterCredential);

        return await session.user.getIdToken();
      } else {
        throw new Error('Twitter login cancelled or error');
      }
    } catch (error) {
      throw error;
    }
  };

  return { twitterAuthCallback };
}
