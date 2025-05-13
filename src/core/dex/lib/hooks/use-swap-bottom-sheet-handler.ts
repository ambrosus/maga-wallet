import { useCallback } from 'react';
import { Keyboard } from 'react-native';
import { bnZERO } from '@constants';
import { useSwapContextSelector } from '@core/dex/context';
import { BottomSheetStatus, FIELD, SelectedTokensKeys } from '@core/dex/types';
import { useSwapAllBalances } from './use-swap-all-balances';

export function useSwapBottomSheetHandler() {
  const {
    bottomSheetTokenARef,
    bottomSheetTokenBRef,
    bottomSheetPreviewSwapRef,
    bottomSheetSwapStatus,
    setBottomSheetSwapStatus,
    setEstimatedGasValues
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

  const onReviewSwapPreview = useCallback(() => {
    bottomSheetPreviewSwapRef.current?.present();
  }, [bottomSheetPreviewSwapRef]);

  const onReviewSwapDismiss = useCallback(() => {
    setEstimatedGasValues({ swap: bnZERO, approval: bnZERO });
    bottomSheetPreviewSwapRef.current?.dismiss();
  }, [bottomSheetPreviewSwapRef, setEstimatedGasValues]);

  return {
    onDismissBottomSheetByKey,
    onShowBottomSheetByKey,
    onDismissBottomSheets,
    onReviewSwapPreview,
    onReviewSwapDismiss,
    onChangeBottomSheetSwapStatus,
    bottomSheetSwapStatus
  };
}
