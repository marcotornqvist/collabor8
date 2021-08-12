import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { UserInputError } from "apollo-server-express";
import { hash, compare } from "bcryptjs";
import { Profile } from "../entities/Profile";
import { Context } from "../types/Interfaces";
import { CountryResponse } from "./responses/CountryResponse";
import countries from "../data/countries";
import { isAuth } from "../utils/isAuth";

// TODO: Resolvers to be implemented:
// users:         Return all users - In Progress (pagination and filtering)
// userbyId:      Return a single user by id - In Progress ()

@Resolver(Profile)
export class ProfileResolver {
  @Query(() => [CountryResponse], {
    nullable: true,
    description: "Returns countries based on search argument",
  })
  async getCountries(@Arg("search") search: string) {
    const regex = new RegExp(`${search}`, "gi");

    const filtered = countries.filter((item: CountryResponse) => {
      return item.country.match(regex);
    });

    console.log(filtered);

    // On the frontend input check if array is empty
    // and if it is don't allow typing of more words since it won't return anything else
    // if this operation is slow move the filter to the frontend and just return countries
    // which it will likely be
    return filtered;
  }

  // Set the country in the profile
  // Validate to check if country key exists then add country to country value
  // Validate to check if user owns the profile

  // change to mutation
  // @Query(() => CountryResponse, {
  //   nullable: true,
  //   description: "Updates a users profile",
  // })
  // async updateProfile(@Arg("data") search: string) {

  //   return test;
  // }
}
