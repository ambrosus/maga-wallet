export enum ToastPosition {
  Top = 'top',
  Bottom = 'bottom'
}

export enum ToastType {
  Failed = 'Failed',
  Success = 'Success'
}

export interface ToastOptions {
  text: string;
  type: ToastType;
  duration?: number;
}

export interface ToastRef {
  show: (params: ToastOptions) => void;
  hide: () => void;
}
