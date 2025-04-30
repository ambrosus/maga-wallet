export interface XUserResponse {
  data: {
    id: string;
    name: string;
    username: string;
  };
}

export interface XAuthTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
}
