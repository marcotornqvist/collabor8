import "reflect-metadata";
require("dotenv").config();
import express from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./graphql/resolvers/UserResolver";
import { ProjectResolver } from "./graphql/resolvers/ProjectResolver";
import { SocialResolver } from "./graphql/resolvers/SocialResolver";
import { MessageResolver } from "./graphql/resolvers/MessageResolver";
import { MemberResolver } from "./graphql/resolvers/MemberResolver";
import { ApolloServer } from "apollo-server-express";
import { DateTimeResolver } from "graphql-scalars";
import cookieParser from "cookie-parser";
import cors from "cors";
import { prisma } from "./graphql/utils/context";
import { Context } from "./graphql/types/Interfaces";
import { GraphQLScalarType } from "graphql";
import { corsOptions } from "./graphql/utils/corsOptions";
import { refreshToken } from "./graphql/utils/refreshToken";

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
      SocialResolver,
      ProjectResolver,
      MemberResolver,
      MessageResolver,
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
