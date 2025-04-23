import { AppleIcon, FacebookIcon, GoogleIcon, XIcon } from '@components/svgs';
import { isIos } from '@constants/ui/device';

export const AUTH_METHODS = [
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
