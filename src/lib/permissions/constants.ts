import { Platform } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';
import { PermissionKeys } from './types';

export const APP_SUPPORTED_PERMISSIONS = [PermissionKeys.CAMERA];

export const APP_PERMISSIONS = {
  [PermissionKeys.CAMERA]:
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
} as const;
