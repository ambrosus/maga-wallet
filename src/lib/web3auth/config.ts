export const AUTH_ENVIRONMENT = {
  clientId: process.env.W3A_CLIENT_ID ?? '',
  firebaseClientId: process.env.FIREBASE_OAUTH_CLIENT_ID ?? '',
  google: {
    provider: process.env.W3A_GOOGLE_PROVIDER ?? ''
  },
  apple: {
    provider: process.env.W3A_APPLE_PROVIDER ?? ''
  },
  twitter: {
    provider: process.env.W3A_TWITTER_PROVIDER ?? ''
  }
} as const;
