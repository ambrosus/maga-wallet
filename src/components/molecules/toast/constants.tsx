import { ReactElement } from 'react';
import { InfoIcon, CheckboxCircleFill } from '@components/svgs';
import { COLORS } from '@constants';
import { ToastType } from './types';

export const ToastBg: Record<ToastType, string> = {
  [ToastType.Failed]: COLORS.white,
  [ToastType.Success]: COLORS.white
};

export const ToastBorderColor: Record<ToastType, string> = {
  [ToastType.Failed]: COLORS.neutral200,
  [ToastType.Success]: COLORS.neutral200
};

export const ToastStatusIcon: Record<ToastType, ReactElement> = {
  [ToastType.Failed]: <InfoIcon scale={0.5} />,
  [ToastType.Success]: (
    <CheckboxCircleFill color={COLORS.success500} scale={1} />
  )
};

export const TOAST_DEFAULT_DURATION = 2500;
