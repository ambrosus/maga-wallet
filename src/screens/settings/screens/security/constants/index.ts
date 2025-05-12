import { MMKV_KEYS } from '@lib/mmkv/keys';
import { SecurityItemTypes, SecuritySettingItem } from '../types';

export const SECURITY_SETTINGS: SecuritySettingItem[] = [
  {
    type: SecurityItemTypes.signWithFaceID,
    mmkvKey: MMKV_KEYS.signWithFaceID,
    labelKey: 'settings.tabs.security.face.id'
  },
  {
    type: SecurityItemTypes.twoFAAuth,
    mmkvKey: MMKV_KEYS.twoFAAuthConnected,
    labelKey: 'settings.tabs.security.twoFA.auth'
  },
  {
    type: SecurityItemTypes.autoApproval,
    mmkvKey: MMKV_KEYS.autoApproval,
    labelKey: 'settings.tabs.security.auto.approval',
    descriptionKey: 'settings.tabs.security.auto.approval.description'
  }
];
