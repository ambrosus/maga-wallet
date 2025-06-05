import { MMKV_KEYS } from '@lib/mmkv/keys';
import { SecurityItemTypes, SecuritySettingItem } from '../types';

export const SECURITY_SETTINGS: SecuritySettingItem[] = [
  {
    type: SecurityItemTypes.signWithFaceID,
    mmkvKey: MMKV_KEYS.signWithFaceID,
    labelKey: 'settings.security.face.id'
  },
  {
    type: SecurityItemTypes.twoFAAuth,
    mmkvKey: MMKV_KEYS.twoFAAuthConnected,
    labelKey: 'settings.security.twoFA.auth'
  },
  {
    type: SecurityItemTypes.autoApproval,
    mmkvKey: MMKV_KEYS.autoApproval,
    labelKey: 'settings.security.auto.approval',
    descriptionKey: 'settings.security.auto.approval.description'
  }
];
