export const APP_SCHEME = 'maga-wallet://';
export const APP_SCHEME_SLUG = 'maga-wallet';

export const BASE_PERCENTS_PRESET = [25, 50, 75, 100] as const;

export type ArrowOrientation = 'up' | 'down' | 'left' | 'right';

export enum ArrowPosition {
  up = '90',
  down = '-90',
  left = '0',
  right = '180'
}
