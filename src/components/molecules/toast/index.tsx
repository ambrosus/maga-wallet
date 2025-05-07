import { useCallback, useRef } from 'react';
import { ToastWrapper } from './toast-wrapper';
import { ToastOptions, ToastRef } from './types';

const toastRefs: ToastRef[] = [];

export const Toast = () => {
  const toastRef = useRef<ToastRef | null>(null);

  const setRef = useCallback((ref: ToastRef) => {
    if (ref) {
      toastRef.current = ref;
      toastRefs.push(toastRef.current);
    }
  }, []);

  return <ToastWrapper ref={setRef} />;
};

Toast.show = (params: ToastOptions) => {
  toastRefs.forEach((ref) => {
    ref.show(params);
  });
};

Toast.hide = () => {
  toastRefs.forEach((ref) => {
    ref.hide();
  });
};
