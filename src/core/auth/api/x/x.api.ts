import axios from 'axios';
import { XUserResponse } from './types';
import { X_ACCESS_TOKEN_VERIFIER, X_USER_INFO_URL } from '../../constants';

export const fetchUserDetails = async (accessToken: string) => {
  try {
    const {
      data: { data },
      status,
      request
    } = await axios.get<XUserResponse>(X_USER_INFO_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return { data, status, request };
  } catch (error) {
    return { error: !!error };
  }
};

export const fetchAuthToken = async (payload: string) => {
  try {
    const response = await fetch(X_ACCESS_TOKEN_VERIFIER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const XApiService = {
  fetchUserDetails,
  fetchAuthToken
};
