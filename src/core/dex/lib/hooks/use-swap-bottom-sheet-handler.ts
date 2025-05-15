import { useCallback } from 'react';
import { Keyboard } from 'react-native';
import { useSwapContextSelector } from '@core/dex/context';
import { BottomSheetStatus, FIELD, SelectedTokensKeys } from '@core/dex/types';
import { useSwapAllBalances } from './use-swap-all-balances';

export function useSwapBottomSheetHandler() {
  const {
    bottomSheetTokenARef,
    bottomSheetTokenBRef,
    bottomSheetSwapStatus,
    setBottomSheetSwapStatus
  } = useSwapContextSelector();

  const { fetchAllBalances } = useSwapAllBalances();

  const onChangeBottomSheetSwapStatus = useCallback(
    (status: BottomSheetStatus) => setBottomSheetSwapStatus(status),
    [setBottomSheetSwapStatus]
  );

  const onShowBottomSheetByKey = useCallback(
    (key: SelectedTokensKeys) => {
      Keyboard.dismiss();
      fetchAllBalances();

      setTimeout(() => {
        if (key === FIELD.TOKEN_A) bottomSheetTokenARef.current?.present();
        else bottomSheetTokenBRef.current?.present();
      }, 500);
    },
    [bottomSheetTokenARef, bottomSheetTokenBRef, fetchAllBalances]
  );

  const onDismissBottomSheetByKey = useCallback(
    (key: SelectedTokensKeys) => {
      if (key === FIELD.TOKEN_A) bottomSheetTokenARef.current?.dismiss();
      else bottomSheetTokenBRef.current?.dismiss();
    },
    [bottomSheetTokenARef, bottomSheetTokenBRef]
  );

  const onDismissBottomSheets = useCallback(() => {
    bottomSheetTokenARef.current?.dismiss();
    bottomSheetTokenBRef.current?.dismiss();
  }, [bottomSheetTokenARef, bottomSheetTokenBRef]);

  return {
    onDismissBottomSheetByKey,
    onShowBottomSheetByKey,
    onDismissBottomSheets,
    onChangeBottomSheetSwapStatus,
    bottomSheetSwapStatus
  };
}
