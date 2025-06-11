import { FastifyCorsOptions } from "@fastify/cors";
import { YOLAT_API_ROUTES } from "../Utils/Enum";
import { PayoutOpts } from "../Schemas/transaction.schemas";

const transactionRoutes = (fastify: any, options: any, done: any) => {
  fastify.post(YOLAT_API_ROUTES.PAYOUT, PayoutOpts);
  done();
};
export default transactionRoutes;
