import "reflect-metadata";
require("dotenv").config();
import express from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { ProfileResolver } from "./resolvers/ProfileResolver";
import { ProjectResolver } from "./resolvers/ProjectResolver";
import { SocialResolver } from "./resolvers/SocialResolver";
import { MessageResolver } from "./resolvers/MessageResolver";
import { MemberResolver } from "./resolvers/MemberResolver";
import { ApolloServer } from "apollo-server-express";
import { DateTimeResolver } from "graphql-scalars";
import cookieParser from "cookie-parser";
import cors from "cors";
import { prisma } from "./utils/context";
import { Context } from "./types/Interfaces";
import { GraphQLScalarType } from "graphql";
import { corsOptions } from "./utils/corsOptions";
import { refreshToken } from "./utils/refreshToken";
import { NotificationResolver } from "./resolvers/NotificationResolver";

const PORT = process.env.PORT || 4000;

const app = async () => {
  const app = express();

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
      MemberResolver,
      MessageResolver,
      NotificationResolver
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

  app.listen(PORT, () => {
    console.log(`Server ready at: http://localhost:${PORT}`);
  });
};

app();
