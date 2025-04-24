import { Dimensions, Platform } from 'react-native';

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const KEYBOARD_OPENING_TIME = 500;

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const ANIMATION_DELAY = 500;
