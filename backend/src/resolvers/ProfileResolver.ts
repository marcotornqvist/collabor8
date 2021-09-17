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
import { Context, LooseObject, S3UploadStream } from "../types/Interfaces";
import { CountryResponse } from "./responses/CountryResponse";
import countries from "../data/countries";
import { isAuth } from "../utils/isAuth";
import { FileArgs, UpdateProfileInput } from "./inputs/ProfileInput";
import { UserInputError } from "apollo-server-errors";
import { capitalizeWords } from "../helpers/capitalizeWords";
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter";
import { UploadedFileResponse } from "./responses/ProfileResponse";
import { S3 } from "aws-sdk";

// TODO: Queries/mutations to be implemented:
// countries:             Return all countries - Done
// loggedInProfile:       Set a country - Done
// updateProfile:         Update profile Settings - Done
// updateImage:           Update Image - In Progress
// deleteImage:           Delete Image - In Progress

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
    // Return logged in profile details
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
    let errors: LooseObject = {};

    try {
      // trim() removes whitespace from the beginning and end
      firstName = firstName ? capitalizeWords(firstName.trim()) : null;
      lastName = lastName ? capitalizeWords(lastName.trim()) : null;
      let fullName =
        ((firstName ?? "") + " " + (lastName ?? "")).trim() || null;
      country = country || null;
      bio = bio ? capitalizeFirstLetter(bio.trim()) : null;

      let fields = {
        firstName,
        lastName,
        fullName,
        country,
        bio,
      };

      // Check that first name length is not more than 255 characters
      if (firstName && firstName.length > 255) {
        errors.firstName = "First name cannot be more than 255 characters";
      }

      // Check that last name length is not more than 255 characters
      if (lastName && lastName.length > 255) {
        errors.lastName = "Last name cannot be more than 255 characters";
      }

      // Check that bio length is not more than 500 characters
      if (bio && bio.length > 500) {
        errors.bio = "Bio cannot be more than 500 characters";
      }

      // Check that country exists by comparing selected country with countries list
      const countryExists = countries.filter(
        (item) => item.country === country
      );

      if (countryExists.length < 1) {
        country = null;
      }

      // Checks if a disciplineId was provided else disconnect the single disciplineId
      if (disciplineId) {
        // Checks if discipline exist
        const disciplineExists = await prisma.discipline.findUnique({
          where: {
            id: disciplineId,
          },
        });

        if (disciplineExists) {
          Object.assign(fields, {
            discipline: {
              connect: {
                id: disciplineId,
              },
            },
          });
        } else {
          throw new UserInputError("Discipline doesn't exist");
        }
      } else {
        Object.assign(fields, {
          discipline: {
            disconnect: true,
          },
        });
      }

      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      // Update the profile
      const updateProfile = await prisma.profile.update({
        where: {
          userId: payload!.userId,
        },
        data: fields,
        include: {
          discipline: true,
        },
      });

      return updateProfile;
    } catch (err) {
      console.log(err);
      throw new UserInputError("Errors", { errors });
    }
  }

  @Mutation(() => UploadedFileResponse, {
    description: "Update Profile Image",
  })
  // @UseMiddleware(isAuth)
  async singleUpload(
    @Arg("file") { stream, filename, mimetype, encoding }: FileArgs,
    @Ctx() { payload, prisma }: Context
  ): Promise<UploadedFileResponse> {
    console.log(stream);
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      region: process.env.AWS_REGION!,
    });

    const createUploadStream = (key: string): S3UploadStream => {
      const pass = new stream.PassThrough();
      return {
        writeStream: pass,
        promise: s3
          .upload({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key,
            Body: pass,
          })
          .promise(),
      };
    };

    const uploadStream = createUploadStream(filename);

    stream.pipe(uploadStream.writeStream);
    const result = await uploadStream.promise;

    // Get the link representing the uploaded file
    const link = result.Location;
    console.log(link);

    return { filename, mimetype, encoding, url: link };
  }
}
