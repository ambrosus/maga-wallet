const environments = {
  production: {
    ENV: 'production',
    CHAIN_ID: 16718,
    NETWORK_URL: 'https://network.ambrosus.io',
    actions: {
      send: true,
      swap: true,
      receive: true
    }
  },
  staging: {
    ENV: 'staging',
    CHAIN_ID: 16718,
    NETWORK_URL: 'https://network.ambrosus.io',
    actions: {
      send: true,
      swap: true,
      receive: true
    }
  },
  testnet: {
    ENV: 'testnet',
    CHAIN_ID: 22040,
    NETWORK_URL: 'https://network.ambrosus-test.io',
    actions: {
      send: true,
      swap: true,
      receive: true
    }
  }
} as const;

export const Config = environments.testnet;
