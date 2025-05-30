import {
  QRScannerContextState,
  useQRScannerSelector
} from '@contexts/qr-scanner';

export const useQRScanner = (): QRScannerContextState => {
  return useQRScannerSelector((state: QRScannerContextState) => state);
};
