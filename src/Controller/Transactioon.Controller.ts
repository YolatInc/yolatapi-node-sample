import { FastifyReply, FastifyRequest } from "fastify";
import { ITransactionService } from "../Interfaces/ITransactionService";
import { TransactionService } from "../Services/transaction.service";
import { StatusCodes } from "http-status-codes";

export const TransactionController = async (
  req: FastifyRequest<{ Body: ITransactionService }>,
  reply: FastifyReply
) => {
  try {
    const response = await TransactionService.payout(req.body);
    reply.code(StatusCodes.CREATED).send(response);
  } catch (err) {
    reply.status(StatusCodes.BAD_REQUEST).send(err);
  }
};
