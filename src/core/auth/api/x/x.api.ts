/* eslint-disable camelcase */
import { Platform } from 'react-native';
import axios, { AxiosHeaders } from 'axios';
import CryptoJS from 'crypto-js';
import OAuth from 'oauth-1.0a';
import queryString from 'query-string';
import { pipe } from 'ramda';
import { APP_SCHEME_SLUG } from '@constants';

const consumerKey = process.env.X_CONSUMER_KEY ?? '';
const consumerSecret = process.env.X_CONSUMER_SECRET ?? '';
const xRequestTokenUrl = 'https://api.twitter.com/oauth/request_token';
const xAccessTokenUrl = 'https://api.twitter.com/oauth/access_token';

type OAuthParams = OAuth.Authorization & { oauth_callback: string };

function parseQueryString(data: string): Record<string, string> {
  return queryString.parse(data) as Record<string, string>;
}

const getDeepLink = () => {
  const scheme = APP_SCHEME_SLUG;
  const prefix =
    Platform.OS == 'android' ? `${scheme}://my-host/` : `${scheme}://`;
  return prefix;
};

const oauth = new OAuth({
  consumer: { key: consumerKey, secret: consumerSecret },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
  }
});

async function getTwitterRequestToken() {
  const callbackUrl = getDeepLink();

  const getOAuthParams = () => {
    const params = oauth.authorize({
      url: xRequestTokenUrl,
      method: 'POST',
      data: { oauth_callback: callbackUrl }
    });
    return { ...params, oauth_callback: callbackUrl } as OAuthParams;
  };

  const createHeaders = (params: OAuthParams) => oauth.toHeader(params);

  const headers = pipe(getOAuthParams, createHeaders)();

  try {
    const response = await axios.post(xRequestTokenUrl, null, {
      headers: headers as unknown as AxiosHeaders
    });

    // Check if response.data exists and is a string
    if (!response.data || typeof response.data !== 'string') {
      throw new Error(
        `Invalid response format: ${JSON.stringify(response.data)}`
      );
    }

    return parseQueryString(response.data);
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

  const authorizeRequest = (
    requestData: ReturnType<typeof createRequestData>
  ) => oauth.authorize(requestData, token);

  const buildHeaders = (authorization: OAuth.Authorization) => ({
    ...oauth.toHeader(authorization),
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  const headers = pipe(createRequestData, authorizeRequest, buildHeaders)();

  try {
    const response = await axios.post(
      xAccessTokenUrl,
      `oauth_verifier=${encodeURIComponent(oauth_verifier)}`,
      { headers }
    );

    return parseQueryString(response.data);
  } catch (error: any) {
    throw error.response?.data || error;
  }
}

export const XApiService = {
  getTwitterRequestToken,
  getAccessToken,
  parseQueryString
};
