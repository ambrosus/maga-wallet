import { useCallback } from 'react';
import { StringUtils } from '@utils';

/**
 * Custom hook to handle passcode input changes.
 *
 * @param passcode Current passcode string
 * @param setPasscode Setter for passcode state
 * @param options Optional behaviors for navigation, error, shake, etc.
 */
export function useHandleCodeChange({
  passcode,
  setPasscode,
  onComplete,
  error,
  setError,
  triggerShake
}: {
  passcode: string;
  setPasscode: React.Dispatch<React.SetStateAction<string>>;
  onComplete?: (code: string) => void;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
  triggerShake?: () => void;
}) {
  return useCallback(
    (text: string) => {
      if (passcode.length === 4) return;

      if (error && setError) {
        setError('');
        if (triggerShake) triggerShake();
      }

      const numericText = StringUtils.removeNonNumericCharacters(text, false);
      const newCode = `${passcode}${numericText}`;
      setPasscode(newCode);
      if (newCode.length === 4 && onComplete) {
        onComplete(newCode);
      }
    },
    [passcode, error, setError, setPasscode, onComplete, triggerShake]
  );
}
