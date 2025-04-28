import { useCallback } from 'react';

/**
 * Custom hook to handle removing the last digit from a passcode input.
 * Optionally clears error state if present.
 *
 * @param passcode Current passcode string
 * @param setPasscode Setter for passcode state
 * @param error Optional error string
 * @param setError Optional setter for error state
 */
export function useHandleRemove({
  passcode,
  setPasscode,
  error,
  setError
}: {
  passcode: string;
  setPasscode: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
}) {
  return useCallback(() => {
    if (error && setError) {
      setError('');
    }
    if (passcode.length > 0) {
      setPasscode((prev) => prev.slice(0, -1));
    }
  }, [error, setError, passcode, setPasscode]);
}
