import { useCallback, useEffect } from 'react';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes
} from '@react-native-google-signin/google-signin';
import { _decodeToken, web3auth } from '@lib/web3auth';
import { AUTH_ENVIRONMENT } from '@lib/web3auth/config';
import { AuthMethods } from '@types';
import { useTwitterMiddleware } from './use-twitter-middleware';

GoogleSignin.configure({
  webClientId: process.env.FIREBASE_WEB_CLIENT_ID
});

export function useAuth() {
  const { twitterAuthCallback } = useTwitterMiddleware();

  useEffect(() => {
    web3auth.init();
  }, []);

  const authCallback = useCallback(
    async (type: AuthMethods) => {
      if (web3auth.status === 'connected') {
        await web3auth.logout();
      }

      switch (type) {
        case 'google': {
          try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            if (isSuccessResponse(response)) {
              const {
                data: { idToken }
              } = response;

              const verifier = AUTH_ENVIRONMENT.google.provider ?? '';

              if (idToken) {
                const { email: verifierId } = _decodeToken<'email'>(idToken);

                return await web3auth.connect({
                  verifier,
                  verifierId,
                  idToken
                });
              }
            }
          } catch (error) {
            if (isErrorWithCode(error)) {
              switch (error.code) {
                case statusCodes.IN_PROGRESS:
                  // operation (eg. sign in) already in progress
                  break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                  // Android only, play services not available or outdated
                  break;
                default:
                // some other error happened
              }
            }
          }
          break;
        }
        case 'facebook':
        case 'apple': {
          const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL]
          });

          const credentialState = await appleAuth.getCredentialStateForUser(
            appleAuthRequestResponse.user
          );

          if (credentialState === appleAuth.State.AUTHORIZED) {
            return appleAuthRequestResponse;
          }
        }
        case 'x':
          return await twitterAuthCallback();

        default:
          return undefined;
      }
    },
    [twitterAuthCallback]
  );

  return { authCallback };
}
