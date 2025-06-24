import { Type as T } from "@sinclair/typebox";
import { TransactionController } from "../Controller/Transactioon.Controller";
export const payoutSchema = T.Object({
  senderDetail: T.Object({
    firstName: T.String(),
    lastName: T.String(),
  }),
  transactionDetail: T.Object({
    walletCurrencyCode: T.String(),
    receiveCurrencyCode: T.String(),
    accountNumber: T.String(),
    accountName: T.String(),
    bankCode: T.String(),
    amount: T.Number(),
    transactionReference: T.String(),
    beneficiaryId: T.String(),
  }),
});

export const PayoutOpts = {
  schema: {
    body: payoutSchema,
    tags: ["Transaction Payout"],
  },
  handler: TransactionController,
};
