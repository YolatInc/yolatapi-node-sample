import { FastifyCorsOptions } from "@fastify/cors";
import { YOLAT_API_ROUTES } from "../Utils/Enum";
import {
  PayoutFromWalletOpts,
  PayoutNoWalletOpts,
  PayoutOpts,
} from "../Schemas/transaction.schemas";

const transactionRoutes = (fastify: any, options: any, done: any) => {
  fastify.post(YOLAT_API_ROUTES.PAYOUT, PayoutOpts);
  fastify.post(YOLAT_API_ROUTES.PAYOUT_NO_WALLET, PayoutNoWalletOpts);
  fastify.post(YOLAT_API_ROUTES.PAYOUT_FROM_WALLET, PayoutFromWalletOpts);
  done();
};
export default transactionRoutes;
