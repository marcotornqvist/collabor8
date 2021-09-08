import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { Profile } from "../types/Profile";
import { Context } from "../types/Interfaces";
import { CountryResponse } from "./responses/CountryResponse";
import countries from "../data/countries";
import { isAuth } from "../utils/isAuth";
import { UpdateProfileInput } from "./inputs/ProfileInput";

// TODO: Queries/mutations to be implemented:
// countries:             Return all countries - Done
// loggedInProfile:       Set a country - Done
// updateImage:           Update Image - In Progress
// updateProfile:         Update profile Settings - Done

@Resolver(Profile)
export class ProfileResolver {
  @Query(() => [CountryResponse], {
    nullable: true,
    description: "Returns countries based on search argument",
  })
  async countries(@Arg("search") search: string) {
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

  @Query(() => Profile, {
    nullable: true,
    description: "Returns logged in user profile",
  })
  @UseMiddleware(isAuth)
  async loggedInProfile(@Ctx() { payload, prisma }: Context) {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: payload!.userId,
      },
      include: {
        discipline: true,
      },
    });

    return profile;
  }

  @Mutation(() => Profile, {
    description: "Update Profile",
  })
  @UseMiddleware(isAuth)
  async updateProfile(
    @Arg("data")
    { firstName, lastName, country, disciplineId, bio }: UpdateProfileInput,
    @Ctx() { payload, prisma }: Context
  ): Promise<Profile> {
    let fields = {
      firstName,
      lastName,
      country,
      bio,
    };

    const countryExists = countries.filter((item) => item.country === country);

    if (countryExists.length < 1) {
      country = null;
    }

    if (disciplineId) {
      Object.assign(fields, {
        discipline: {
          connect: {
            id: disciplineId,
          },
        },
      });
    } else {
      Object.assign(fields, {
        discipline: {
          disconnect: true,
        },
      });
    }

    const updateProfile = await prisma.profile.update({
      where: {
        userId: payload!.userId,
      },
      data: fields,
    });

    return updateProfile;
  }
}
