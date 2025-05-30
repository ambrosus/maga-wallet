export type QRCallback = (value: string) => void;

export interface QRScannerContextState {
  qrCallback: QRCallback | null;
  setQRCallback: (callback: QRCallback | null) => void;
}
