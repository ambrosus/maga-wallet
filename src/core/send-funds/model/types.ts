export interface SendFundsStoreModel {
  amount: string;
  setAmount: (amount: string) => void;
  receipient: string;
  setReceipient: (receipient: string) => void;
  reset: () => void;
}
