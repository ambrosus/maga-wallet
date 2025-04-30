import { useCallback, useState } from 'react';
import { mmkv } from '@lib';
import { MMKV_KEYS } from '@lib/mmkv/keys';

export function useSecurityScreenStorage(key: MMKV_KEYS) {
  const getValue = () => {
    const data = mmkv.getItem(key);
    return typeof data === 'string' ? JSON.parse(data) : !!data;
  };

  const [value, setValue] = useState<boolean>(getValue);

  const toggle = useCallback(() => {
    setValue((prev) => {
      const next = !prev;
      mmkv.setItem(key, JSON.stringify(next));
      return next;
    });
  }, [key]);

  return { value, toggle };
}
