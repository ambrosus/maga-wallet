import { MMKV } from 'react-native-mmkv';
import { MMKV_KEYS } from './keys';

const Storage = class MMKVInstance {
  private mmkv: MMKV;

  constructor() {
    this.mmkv = new MMKV({
      id: 'app-storage'
    });
  }

  getItem(key: MMKV_KEYS): string | undefined {
    return this.mmkv.getString(key as string);
  }
  setItem(key: MMKV_KEYS, value: string): void {
    this.mmkv.set(key as string, value);
  }
  removeItem(key: MMKV_KEYS): void {
    this.mmkv.delete(key as string);
  }
  clear(): void {
    this.mmkv.clearAll();
  }
  getAllKeys(): MMKV_KEYS[] {
    return this.mmkv.getAllKeys() as MMKV_KEYS[];
  }
};

export const mmkv = new Storage();
