import { FastifyReply, FastifyRequest } from "fastify";
import { YOLAT_ROUTES } from "../Utils/Enum";
import WelcomeController from "../Controller/Welcome.Controller";
const fs = require("fs").promises;
const welcomeRoutes = (fastify: any, options: any, done: any) => {
  fastify.get(YOLAT_ROUTES.WELCOME, WelcomeController);
  fastify.get(
    "/health",
    async (request: FastifyRequest, reply: FastifyReply) => {
      reply.status(200).send({ status: "OK" });
    }
  );

  done();
};
export default welcomeRoutes;
