import { Account } from 'viem';

export type AccountsStore = {
  accounts: Account[];
  account: Account | null;
  setAccounts: (accounts: Account[]) => void;
  setAccount: (account: Account) => void;
};
