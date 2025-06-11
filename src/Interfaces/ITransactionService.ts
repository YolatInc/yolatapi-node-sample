export interface ISignTransacction {
  payload: string;
  timeStamp: string;
  nounce: string;
  privateKey: string;
}

export interface ITransactionService {
  senderDetail: {
    firstName: string;
    lastName: string;
  };
  transactionDetail: {
    currencyCode: string;
    accountNumber: string;
    accountName: string;
    bankCode: string;
    amount: number;
    transactionReference: string;
    beneficiaryId?: number;
  };
}
