import { create } from 'zustand';
import { SendFundsStoreModel } from './types';

export const useSendFundsStore = create<SendFundsStoreModel>((set) => ({
  amount: '',
  setAmount: (amount: string) => set({ amount }),
  receipient: '',
  setReceipient: (receipient: string) => set({ receipient }),
  reset: () => set({ amount: '', receipient: '' })
}));
