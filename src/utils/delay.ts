import { ANIMATION_DELAY } from '@constants';

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const delayNavigationAction = (
  callback: () => void,
  ms = ANIMATION_DELAY + ANIMATION_DELAY / 2.75
) => {
  setTimeout(() => callback(), ms);
};
