import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  // FieldResolver,
  // Root,
  // Int,
  // InputType,
  // Field,
} from "type-graphql";
// import { User } from "../entities/User";
import { Project } from "../entities/Project";
import { Context } from "../utils/context";

@Resolver(() => Project)
export class ProjectResolver {
  @Query(() => [Project])
  async projects(@Ctx() ctx: Context) {
    return ctx.prisma.project.findMany();
  }
}
