import { useCallback, useRef } from 'react';
import { useSendFundsStore } from '@core/send-funds/model';
import { NumberUtils, StringUtils } from '@utils';

const RAPID_DELETE_INTERVAL = 100; // Milliseconds between rapid deletes
const INITIAL_DELETE_DELAY = 400; // Milliseconds to wait before rapid delete starts

export const useKeyboardHandler = () => {
  const { amount, setAmount } = useSendFundsStore();
  const removeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialDeleteTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onKeyboardButtonPressHandle = useCallback(
    (payload: string) => {
      const value = amount + payload;
      let finalValue = StringUtils.formatNumberInput(value);
      finalValue = NumberUtils.limitDecimalCount(finalValue, 3);

      setAmount(finalValue);
    },
    [amount, setAmount]
  );

  // Core function for deleting a single character
  const removeSingleCharacter = useCallback(() => {
    const currentStoreAmount = useSendFundsStore.getState().amount;
    if (currentStoreAmount.length > 0) {
      setAmount(currentStoreAmount.slice(0, -1));
    }
  }, [setAmount]);

  const handleRemoveButtonPressIn = useCallback(() => {
    // Clear any previously uncleared timers (safety measure)
    if (initialDeleteTimeoutRef.current)
      clearTimeout(initialDeleteTimeoutRef.current);
    if (removeIntervalRef.current) clearInterval(removeIntervalRef.current);
    initialDeleteTimeoutRef.current = null;
    removeIntervalRef.current = null;

    // DO NOT delete character here.
    // Deletion for a tap is handled by onKeyboardRemoveTap.
    // Deletion for a hold will start after INITIAL_DELETE_DELAY.

    initialDeleteTimeoutRef.current = setTimeout(() => {
      initialDeleteTimeoutRef.current = null; // The timeout has now fired

      // Perform the first deletion for the "hold" action
      removeSingleCharacter();

      // Start the interval for subsequent rapid deletions
      removeIntervalRef.current = setInterval(() => {
        const currentStoreAmount = useSendFundsStore.getState().amount;
        if (currentStoreAmount.length === 0) {
          if (removeIntervalRef.current)
            clearInterval(removeIntervalRef.current);
          removeIntervalRef.current = null;
        } else {
          // Directly set amount, as we have the current state
          setAmount(currentStoreAmount.slice(0, -1));
        }
      }, RAPID_DELETE_INTERVAL);
    }, INITIAL_DELETE_DELAY);
  }, [removeSingleCharacter, setAmount]);

  const handleRemoveButtonPressOut = useCallback(() => {
    // Clear timers when button is released
    if (initialDeleteTimeoutRef.current) {
      clearTimeout(initialDeleteTimeoutRef.current);
      initialDeleteTimeoutRef.current = null;
    }
    if (removeIntervalRef.current) {
      clearInterval(removeIntervalRef.current);
      removeIntervalRef.current = null;
    }
  }, []);

  return {
    onKeyboardButtonPressHandle,
    onKeyboardRemoveTap: removeSingleCharacter,
    handleRemoveButtonPressIn,
    handleRemoveButtonPressOut
  };
};
