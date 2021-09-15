import "reflect-metadata";
require("dotenv").config();
import express from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { ProfileResolver } from "./resolvers/ProfileResolver";
import { ProjectResolver } from "./resolvers/ProjectResolver";
import { SocialResolver } from "./resolvers/SocialResolver";
import { ChatResolver } from "./resolvers/ChatResolver";
import { BlockedUserResolver } from "./resolvers/BlockedResolver";
import { ReportResolver } from "./resolvers/ReportResolver";
import { NotificationResolver } from "./resolvers/NotificationResolver";
import { ContactResolver } from "./resolvers/ContactResolver";
import { ApolloServer } from "apollo-server-express";
import { DateTimeResolver } from "graphql-scalars";
import { prisma } from "./utils/context";
import { Context } from "./types/Interfaces";
import { GraphQLScalarType } from "graphql";
import { corsOptions } from "./utils/corsOptions";
import { refreshToken } from "./utils/refreshToken";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import { createServer } from "http";
import { findUser } from "./utils/findUser";
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = process.env.PORT || 5000;

(async () => {
  const app = express();
  const httpServer = createServer(app);

  app.use(cors(corsOptions));

  app.post("/refresh_token", cookieParser(), async (req, res) => {
    refreshToken(req, res);
  });

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      ProfileResolver,
      SocialResolver,
      ProjectResolver,
      ContactResolver,
      ChatResolver,
      NotificationResolver,
      ReportResolver,
      BlockedUserResolver,
    ],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ res, req }): Context => ({
      res,
      req,
      prisma,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: corsOptions, path: "/" });

  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      async onConnect(connectionParams: any) {
        if (connectionParams.Authorization) {
          const currentUser = await findUser(connectionParams.Authorization);
          return { currentUser };
        }

        throw new Error("Missing auth token!");
      },
    },
    { server: httpServer, path: apolloServer.graphqlPath }
  );

  httpServer.listen(PORT, () => {
    console.log(
      `Query endpoint ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
    console.log(
      `Subscription endpoint ready at ws://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
})();
