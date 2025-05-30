import * as Keychain from 'react-native-keychain';

export const keychainStore = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await Keychain.setInternetCredentials(key, value, value); // key, username, password
    } catch (error) {
      console.error(`Error setting ${key} in keychain: `, error);
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      const credentials = await Keychain.getInternetCredentials(key);
      if (credentials) {
        return await credentials.password;
      }
      return null;
    } catch (error) {
      console.error(`Error getting ${key} from keychain: `, error);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await Keychain.resetInternetCredentials(key);
    } catch (error) {
      console.error(`Error removing ${key} from keychain: `, error);
    }
  },

  async clearAll(): Promise<void> {
    try {
      await Keychain.resetGenericPassword();
    } catch (error) {
      console.error('Error clearing all data from keychain: ', error);
    }
  }
};
