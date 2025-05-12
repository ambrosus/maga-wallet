import { MMKV_KEYS } from '@lib/mmkv/keys';

export enum SecurityItemTypes {
  passkey = 'passkey',
  signWithFaceID = 'signWithFaceID',
  twoFAAuth = 'twoFAAuth',
  autoApproval = 'autoApproval'
}

export interface SecuritySettingItem {
  type: SecurityItemTypes;
  mmkvKey: MMKV_KEYS;
  labelKey: string;
  descriptionKey?: string;
}
