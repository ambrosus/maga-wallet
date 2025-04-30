export type W3ADecodedPayload = {
  sub: string;
  email: string;
  exp: number;
  iat: number;
  iss: string;
  nonce: string;
  aud: string;
  auth_time: number;
  email_verified: boolean;
  azp: string;
};
