import { useRef, useCallback, useState, PropsWithChildren } from 'react';
import { createContextSelector } from '@lib';
import { QRCallback, QRScannerContextState } from './types';

const QRScannerContextProvider = () => {
  const callbackRef = useRef<QRCallback | null>(null);
  const [, setQrCallbackState] = useState<QRCallback | null>(null);

  const setQRCallback = useCallback((callback: QRCallback | null) => {
    callbackRef.current = callback;
    setQrCallbackState(callback);
  }, []);

  return {
    get qrCallback() {
      return callbackRef.current;
    },
    setQRCallback
  };
};

export const [QRScannerProvider, useQRScannerSelector] = createContextSelector<
  PropsWithChildren,
  QRScannerContextState
>(QRScannerContextProvider);
