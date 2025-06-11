import { FastifyReply, FastifyRequest } from "fastify";

const WelcomeController = (req: FastifyRequest, reply: FastifyReply) => {
  reply.send({
    message: "Welcome to Yolat Sample",
  });
};

export default WelcomeController;
