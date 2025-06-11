import { createServer } from "./server";
import { YolatSampleConfig } from "./Utils/Environment";
import "reflect-metadata";

const start = async () => {
  const server = await createServer();
  const PORT = YolatSampleConfig.port;
  const HOST = process.env.HOST ?? "0.0.0.0";

  server.listen({
    port: parseInt(PORT?.toString() ?? "5050"),
    host: HOST,
  });

  console.log("Server is running on port", PORT);
  return server;
};

start().catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
});


