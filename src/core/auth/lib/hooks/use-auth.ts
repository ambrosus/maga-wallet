import { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import {
  GoogleSignin,
  isSuccessResponse
} from '@react-native-google-signin/google-signin';
import { createWalletClient, custom } from 'viem';
import { _decodeToken, web3auth } from '@lib/web3auth';
import { AUTH_ENVIRONMENT } from '@lib/web3auth/config';
import { AuthMethods } from '@types';
import { useTwitterMiddleware } from './use-twitter-middleware';

GoogleSignin.configure({
  webClientId: process.env.FIREBASE_WEB_CLIENT_ID
});

const { google, twitter, apple } = AUTH_ENVIRONMENT;

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

              const verifier = google.provider;

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
            throw error;
          }
          break;
        }
        case 'facebook':
        case 'apple': {
          try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
              requestedOperation: appleAuth.Operation.LOGIN,
              requestedScopes: [
                appleAuth.Scope.FULL_NAME,
                appleAuth.Scope.EMAIL
              ]
            });

            const credentialState = await appleAuth.getCredentialStateForUser(
              appleAuthRequestResponse.user
            );

            if (credentialState === appleAuth.State.AUTHORIZED) {
              const { identityToken: idToken } = appleAuthRequestResponse;

              if (idToken) {
                const { sub: verifierId } = _decodeToken<'sub'>(idToken);
                const verifier = apple.provider;

                const provider = await web3auth.connect({
                  verifier,
                  verifierId,
                  idToken
                });

                const walletClient = createWalletClient({
                  transport: custom(provider!)
                });

                const publicKey = await walletClient.getAddresses();

                Alert.alert('🔐 Account:', JSON.stringify(publicKey[0]));

                return provider;
              }
            }
          } catch (error) {
            throw error;
          }
        }
        case 'x': {
          try {
            const idToken = await twitterAuthCallback();
            const verifier = twitter.provider;

            if (idToken) {
              const { sub: verifierId } = _decodeToken<'sub'>(idToken);

              const provider = await web3auth.connect({
                verifier,
                verifierId,
                idToken
              });

              const walletClient = createWalletClient({
                transport: custom(provider!)
              });

              const publicKey = await walletClient.getAddresses();

              Alert.alert('🔐 Account:', JSON.stringify(publicKey[0]));

              return provider;
            }
          } catch (error) {
            throw error;
          }
        }

        default:
          return undefined;
      }
    },
    [twitterAuthCallback]
  );

  return { authCallback };
}
