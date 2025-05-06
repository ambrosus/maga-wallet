/* eslint-disable camelcase */
import 'react-native-get-random-values';
import auth from '@react-native-firebase/auth';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { APP_SCHEME } from '@constants';
import { XApiService } from '@core/auth/api';

export function useTwitterMiddleware() {
  const twitterAuthCallback = async () => {
    try {
      const { oauth_token, oauth_token_secret } =
        await XApiService.getTwitterRequestToken();

      const twitterLoginUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;

      const result = await InAppBrowser.openAuth(twitterLoginUrl, APP_SCHEME, {
        showTitle: true,
        enableUrlBarHiding: true,
        enableDefaultShare: false
      });

      if (result.type === 'success' && result.url) {
        const queryString = result.url.includes('?')
          ? result.url.split('?')[1]
          : '';

        const { oauth_token, oauth_verifier } =
          XApiService.parseQueryString(queryString);

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
