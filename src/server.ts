import Fastify from "fastify";
import cors from "@fastify/cors";
import routes from "./Routes/index.routes";

export async function createServer() {
  const server = Fastify({
    logger: false,
  });

  // Register CORS
  await server.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  });

  // Register routes
  await server.register(routes);

  return server;
}
