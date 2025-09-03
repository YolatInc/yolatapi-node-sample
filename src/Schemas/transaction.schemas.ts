import { Type as T } from "@sinclair/typebox";
import {
  TransactionController,
  TransactionFromWalletController,
  TransactionNoWalletController,
} from "../Controller/Transactioon.Controller";
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

export const payoutNoWalletSchema = T.Object({
  senderDetail: T.Object({
    firstName: T.String(),
    lastName: T.String(),
    emailAddress: T.String({ format: "email" }),
  }),
  transactionDetail: T.Object({
    receiveCurrencyCode: T.String(),
    accountNumber: T.String(),
    accountName: T.String(),
    bankCode: T.String(),
    amount: T.Number(),
    transactionReference: T.String(),
    beneficiaryId: T.String(),
    cryptoCurrencyCode: T.String(),
  }),
});

export const PayoutOpts = {
  schema: {
    body: payoutSchema,
    tags: ["Transaction Payout"],
  },
  handler: TransactionController,
};

export const PayoutNoWalletOpts = {
  schema: {
    body: payoutNoWalletSchema,
    tags: ["Transaction Payout"],
  },
  handler: TransactionNoWalletController,
};

export const PayoutFromWalletOpts = {
  schema: {
    body: payoutNoWalletSchema,
    tags: ["Transaction Payout"],
  },
  handler: TransactionFromWalletController,
};
