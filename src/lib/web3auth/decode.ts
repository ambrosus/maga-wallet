import { decodeToken } from '@web3auth/single-factor-auth';
import { W3ADecodedPayload } from './types';

export const _decodeToken = <T extends keyof W3ADecodedPayload>(
  idToken: string
): Pick<W3ADecodedPayload, T> => {
  return decodeToken<Pick<W3ADecodedPayload, T>>(idToken).payload;
};
