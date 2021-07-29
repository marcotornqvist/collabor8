import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./graphql/resolvers/UserResolver";
import { ApolloServer } from "apollo-server";
import { DateTimeResolver } from "graphql-scalars";
import { context } from "./graphql/context";
import { GraphQLScalarType } from "graphql";

const PORT = process.env.PORT || 4000;

const app = async () => {
  // tq.registerEnumType(SortOrder, {
  //   name: "SortOrder",
  // });

  const schema = await buildSchema({
    resolvers: [UserResolver],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
  });

  new ApolloServer({ schema, context: context }).listen(PORT, () =>
    console.log(`Server ready at: http://localhost:${PORT}`)
  );
};

app();
