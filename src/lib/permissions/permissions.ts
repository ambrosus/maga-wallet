import { Alert } from 'react-native';
import { capitalize } from 'lodash';
import {
  check,
  openSettings,
  PermissionStatus,
  request
} from 'react-native-permissions';
import { APP_PERMISSIONS, APP_SUPPORTED_PERMISSIONS } from './constants';
import { PermissionOptions } from './types';

export class Permissions {
  private static appPermissions = APP_PERMISSIONS;

  private static showSettingsAlert(permission: string): void {
    Alert.alert(
      `${capitalize(permission)} access`,
      `Access to ${capitalize(
        permission
      )} has been blocked. Please enable it in the Settings app to continue`,
      [
        {
          text: 'Settings',
          onPress: this.openSettings
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  }

  private static async request(
    permission: keyof typeof APP_PERMISSIONS
  ): Promise<PermissionStatus> {
    return await request(this.appPermissions[permission]);
  }

  static async check(
    permission: keyof typeof APP_PERMISSIONS,
    options?: PermissionOptions
  ): Promise<PermissionStatus> {
    if (!APP_SUPPORTED_PERMISSIONS.includes(permission)) {
      throw new Error(
        `Permission ${permission} is not supported in this application`
      );
    }

    const permissionKey = this.appPermissions[permission];
    const status = await check(permissionKey);

    if (status === 'granted') return status;

    if (status === 'denied' && options?.requestAgain)
      return this.request(permission);

    if (status === 'blocked' && options?.openSettings)
      this.showSettingsAlert(permission);

    return status;
  }

  private static async openSettings(): Promise<void> {
    await openSettings('application');
  }
}
