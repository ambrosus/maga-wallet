import { create } from 'zustand';
import { AccountsStore } from './types';

export const useAccountsStore = create<AccountsStore>((set) => ({
  accounts: [],
  account: null,
  setAccounts: (accounts) => set({ accounts }),
  setAccount: (account) => set({ account })
}));
