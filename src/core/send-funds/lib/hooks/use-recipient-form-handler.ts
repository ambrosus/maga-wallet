import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '@lib';

export const useRecipientFormHandler = () => {
  const [recipient, setRecipient] = useState('');
  const [isWrongValue, setIsWrongValue] = useState(false);

  const debouncedRecipient = useDebounce(recipient, 1000);

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

  const errorMessage = useMemo(() => {
    if (recipientType === 'invalid') return 'Please enter a valid value.';

    return `Oops! That ${recipientType} looks incorrect.`;
  }, [recipientType]);

  return { error: errorMessage, isWrongValue, recipient, setRecipient };
};
