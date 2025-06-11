import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";
import welcomeRoutes from "./Welcome.routes";
import transactionRoutes from "./Transaction.routes";
export default async function (fastify: FastifyInstance) {
  try {
    // Register Swagger with OpenAPI configuration
    await fastify.register(fastifySwagger, {
      openapi: {
        info: {
          title: "Yolat API Documentation",
          description: "API documentation for Yolat application",
          version: "1.0.0",
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      hideUntagged: true,
    });

    // Register Swagger UI
    await fastify.register(fastifySwaggerUi, {
      routePrefix: "/yolat-swagger",
      uiConfig: {
        deepLinking: false,
      },

      transformStaticCSP: (header: any) => header,
    });

    // Register your local routes
    await fastify.register(welcomeRoutes, {
      exposeRoute: true,
    });
    await fastify.register(transactionRoutes, {
      prefix: "/api/v1",
      exposeRoute: true,
    });
  } catch (err) {
    console.error("Error during route registrations:", err);
    throw err;
  }
}
