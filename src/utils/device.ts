import { DEVICE_HEIGHT, isAndroid } from '@constants';

const smallScreenHeight = [667, 812];

const minimum = Math.max(...smallScreenHeight);

export const isSmallScreen = DEVICE_HEIGHT <= minimum;
export const isAndroidXsScreen = DEVICE_HEIGHT <= 761 && isAndroid;
