import { APP_SCHEME_SLUG, isAndroid } from '@constants';

type DeepLink = `maga-wallet://my-host/` | `maga-wallet://`;

export function getAppDeepLink(): DeepLink {
  const scheme = APP_SCHEME_SLUG;
  return isAndroid ? `${scheme}://my-host/` : `${scheme}://`;
}
