const environments = {
  production: {
    ENV: 'production',
    CHAIN_ID: 16718,
    NETWORK_URL: 'https://network.ambrosus.io'
  },
  staging: {
    ENV: 'staging',
    CHAIN_ID: 16718,
    NETWORK_URL: 'https://network.ambrosus.io'
  },
  testnet: {
    ENV: 'testnet',
    CHAIN_ID: 22040,
    NETWORK_URL: 'https://network.ambrosus-test.io'
  }
} as const;

export const Config = environments.testnet;
