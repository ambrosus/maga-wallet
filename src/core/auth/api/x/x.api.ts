/* eslint-disable camelcase */
import axios, { AxiosHeaders } from 'axios';
import CryptoJS from 'crypto-js';
import OAuth from 'oauth-1.0a';
import queryString from 'query-string';
import { pipe } from 'ramda';
import { getAppDeepLink } from '@core/auth/utils';

const consumerKey = process.env.X_CONSUMER_KEY ?? '';
const consumerSecret = process.env.X_CONSUMER_SECRET ?? '';
const xRequestTokenUrl = 'https://api.twitter.com/oauth/request_token';
const xAccessTokenUrl = 'https://api.twitter.com/oauth/access_token';

type OAuthParams = OAuth.Authorization & { oauth_callback: string };

function parseQueryString(url: string): Record<string, string> {
  return queryString.parse(url) as Record<string, string>;
}

const oauth = new OAuth({
  consumer: { key: consumerKey, secret: consumerSecret },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
  }
});

async function getTwitterRequestToken() {
  const callbackUrl = getAppDeepLink();

  const executeSessionParams = () => {
    const params = oauth.authorize({
      url: xRequestTokenUrl,
      method: 'POST',
      data: { oauth_callback: callbackUrl }
    });
    return { ...params, oauth_callback: callbackUrl } as OAuthParams;
  };

  const createHeaders = (params: OAuthParams) => oauth.toHeader(params);

  const headers = pipe(executeSessionParams, createHeaders)();

  try {
    const { data } = await axios.post(xRequestTokenUrl, null, {
      headers: headers as AxiosHeaders & OAuth.Header
    });

    // Check if response.data exists and is a string
    if (!data || typeof data !== 'string') {
      throw new Error(`Invalid response format: ${JSON.stringify(data)}`);
    }

    return parseQueryString(data);
  } catch (error: any) {
    throw error.response?.data || error;
  }
}

async function getAccessToken(
  oauth_token: string,
  oauth_token_secret: string,
  oauth_verifier: string
): Promise<Record<string, string>> {
  const token = {
    key: oauth_token,
    secret: oauth_token_secret
  };

  const createRequestData = () => ({
    url: xAccessTokenUrl,
    method: 'POST',
    data: { oauth_token, oauth_verifier }
  });

  const authorizeRequest = (req: ReturnType<typeof createRequestData>) =>
    oauth.authorize(req, token);

  const buildHeaders = (session: OAuth.Authorization) => ({
    ...oauth.toHeader(session),
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  const headers = pipe(createRequestData, authorizeRequest, buildHeaders)();

  try {
    const { data } = await axios.post(
      xAccessTokenUrl,
      `oauth_verifier=${encodeURIComponent(oauth_verifier)}`,
      { headers }
    );

    return parseQueryString(data);
  } catch (error: any) {
    throw error.response?.data || error;
  }
}

export const XApiService = {
  getTwitterRequestToken,
  getAccessToken,
  parseQueryString
};
