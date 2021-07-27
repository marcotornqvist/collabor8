import "reflect-metadata";
// const { PrismaClient } = require("@prisma/client");
// const { ApolloServer } = require("apollo-server");
// const fs = require("fs");
// const path = require("path");

// const resolvers = require("./graphql/resolvers");

// const prisma = new PrismaClient();

// const server = new ApolloServer({
//   typeDefs: fs.readFileSync(
//     path.join(__dirname, "./graphql/schema.graphql"),
//     "utf8"
//   ),
//   resolvers,
//   context: {
//     prisma,
//   },
//   playground: true,
// });

// server.listen().then(({ url }) => console.log(`Server is running on ${url}`));

import { buildSchema } from "type-graphql";
import { UserResolver } from "./graphql/resolvers/UserResolver";
import { ApolloServer } from "apollo-server";
import { DateTimeResolver } from "graphql-scalars";
import { context } from "./graphql/context";
import { GraphQLScalarType } from "graphql";

const app = async () => {
  // tq.registerEnumType(SortOrder, {
  //   name: "SortOrder",
  // });

  const schema = await buildSchema({
    resolvers: [UserResolver],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
  });

  new ApolloServer({ schema, context: context }).listen({ port: 4000 }, () =>
    console.log(`Server ready at: http://localhost:4000`)
  );
};

app();
