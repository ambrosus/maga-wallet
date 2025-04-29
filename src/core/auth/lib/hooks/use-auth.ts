import { useCallback } from 'react';
import {
  appleAuth,
  AppleRequestResponse
} from '@invertase/react-native-apple-authentication';
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  SignInSuccessResponse,
  statusCodes
} from '@react-native-google-signin/google-signin';
import { AuthMethods } from '@types';
import { useTwitterMiddleware } from './use-twitter-middleware';

GoogleSignin.configure({
  webClientId: process.env.FIREBASE_WEB_CLIENT_ID
});

type AuthResponse =
  | Promise<
      | SignInSuccessResponse['data']
      | AppleRequestResponse
      | {
          access_token: string;
          expires_in: number;
          refresh_token: string;
          scope: string;
          token_type: string;
        }
    >
  | undefined;

export function useAuth() {
  const { twitterAuthCallback } = useTwitterMiddleware();

  const authCallback = useCallback(
    async (type: AuthMethods): Promise<AuthResponse> => {
      switch (type) {
        case 'google': {
          try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            if (isSuccessResponse(response)) {
              return response.data;
            } else {
              // sign in was cancelled by user
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
            } else {
              // an error that's not related to google sign in occurred
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
