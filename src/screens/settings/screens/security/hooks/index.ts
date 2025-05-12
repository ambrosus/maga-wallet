import { useCallback, useState } from 'react';
import { mmkv } from '@lib';
import { MMKV_KEYS } from '@lib/mmkv/keys';
import { SETTINGS_STACK_ROUTES } from '@navigation';
import { RootNavigationProp } from '@navigation/root-stack';

export function useSecurityScreenStorage(
  key: MMKV_KEYS,
  navigation: RootNavigationProp
) {
  const isTWOFaToggle = key === MMKV_KEYS.twoFAAuthConnected;
  const getValue = useCallback(
    (_key = key) => {
      const data = mmkv.getItem(_key);
      return typeof data === 'string' ? JSON.parse(data) : !!data;
    },
    [key]
  );

  const [value, setValue] = useState<boolean>(getValue);

  const onTwoFAToggle = useCallback(async () => {
    const currentTwoFaState = value;
    const onVerify = () => {
      mmkv.setItem(MMKV_KEYS.twoFAAuthConnected, 'false');
      mmkv.setItem(MMKV_KEYS.twoFAAuthEnabled, 'false');
      setValue(false);
    };

    if (getValue(MMKV_KEYS.isEmailVerified)) {
      if (currentTwoFaState) {
        navigation.navigate(SETTINGS_STACK_ROUTES.TwoFAVerify, {
          onVerify: () => {
            onVerify();
          }
        });
      } else {
        navigation.navigate(SETTINGS_STACK_ROUTES.TwoFAPrepare);
        setValue(true);
      }
    } else {
      navigation.navigate(SETTINGS_STACK_ROUTES.VerifyIdentify);
    }
  }, [getValue, navigation, value]);

  const toggle = useCallback(() => {
    setValue((prev) => {
      const next = !prev;
      mmkv.setItem(key, JSON.stringify(next));
      return next;
    });
  }, [key]);

  return { value, toggle: isTWOFaToggle ? onTwoFAToggle : toggle };
}
