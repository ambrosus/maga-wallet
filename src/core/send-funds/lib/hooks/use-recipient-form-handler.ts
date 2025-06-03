import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSendFundsStore } from '@core/send-funds/model';
import { useDebounce } from '@lib';

export const useRecipientFormHandler = () => {
  const { receipient } = useSendFundsStore();
  const [isWrongValue, setIsWrongValue] = useState(false);

  const debouncedRecipient = useDebounce(receipient, 1000);

  const recipientType = useMemo(() => {
    if (debouncedRecipient) {
      const isEthAddress = /^0x[a-fA-F0-9]{40}$/.test(debouncedRecipient);
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(debouncedRecipient);
      const isPhoneNumber = /^\+?[0-9]{10,15}$/.test(debouncedRecipient);

      if (isEthAddress || debouncedRecipient.startsWith('0x')) return 'address';

      if (isEmail || debouncedRecipient.includes('@')) return 'email';

      if (isPhoneNumber || debouncedRecipient.startsWith('+'))
        return 'phone number';

      return 'invalid';
    }
  }, [debouncedRecipient]);

  useEffect(() => {
    if (debouncedRecipient) {
      const isEthAddress = /^0x[a-fA-F0-9]{40}$/.test(debouncedRecipient);
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(debouncedRecipient);
      const isPhoneNumber = /^\+?[0-9]{10,15}$/.test(debouncedRecipient);

      return setIsWrongValue(!isEthAddress && !isEmail && !isPhoneNumber);
    }

    setIsWrongValue(false);
  }, [debouncedRecipient]);

  const validateTypedValue = useCallback((payload: string) => {
    const isEthAddress = /^0x[a-fA-F0-9]{40}$/.test(payload);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload);
    const isPhoneNumber = /^\+?[0-9]{10,15}$/.test(payload);

    return !isEthAddress && !isEmail && !isPhoneNumber;
  }, []);

  const errorMessage = useMemo(() => {
    if (recipientType === 'invalid') return 'Please enter a valid value.';

    return isWrongValue
      ? `Oops! That ${recipientType} looks incorrect.`
      : undefined;
  }, [isWrongValue, recipientType]);

  return { error: errorMessage, isWrongValue, validateTypedValue };
};
