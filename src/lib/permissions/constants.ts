import { Platform } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';

export const APP_SUPPORTED_PERMISSIONS = ['Camera'];

export const APP_PERMISSIONS = {
  CAMERA:
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
} as const;
