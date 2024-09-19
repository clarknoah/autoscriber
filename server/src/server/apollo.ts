import { Server } from "http";
import { Express } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { User } from "resources";
import initializeSchema from "./schema";
import { json } from "body-parser";
import cors from "cors";
import { populateDemoUser } from "./db";

export default async function initializeApolloServer(
  httpServer: Server,
  app: Express,
  // @ts-ignore
  orm: MikroORM<PostgreSqlDriver>
) {
  const schema = await initializeSchema();

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    introspection: true,
    formatError: (error) => {
      console.error("Error Logging", error);
      return error;
    },
  });


  app.use(cors());
  await server.start();


  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {

        const em = orm.em.fork();

        const user = await populateDemoUser(em);

        return {
          req,
          validationData: undefined as any,
          user,
          em,
          validatedData: {},
        };
      },
    })
  );
}
