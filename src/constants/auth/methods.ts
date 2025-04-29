import { FC } from 'react';
import { AppleIcon, FacebookIcon, GoogleIcon, XIcon } from '@components/svgs';
import { isIos } from '@constants/ui/device';
import { AuthMethods } from '@types';

export type StaticAuthPreset = {
  key: AuthMethods;
  component: FC;
  visible: boolean;
};

export const AUTH_METHODS: StaticAuthPreset[] = [
  {
    key: 'google',
    component: GoogleIcon,
    visible: true
  },
  {
    key: 'facebook',
    component: FacebookIcon,
    visible: true
  },
  {
    key: 'apple',
    component: AppleIcon,
    visible: isIos
  },
  {
    key: 'x',
    component: XIcon,
    visible: true
  }
];
