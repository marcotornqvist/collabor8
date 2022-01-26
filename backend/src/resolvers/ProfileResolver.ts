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
import { Context, LooseObject, Upload } from "../types/Interfaces";
import { CountryResponse } from "./responses/CountryResponse";
import countries from "../data/countries";
import { isAuth } from "../utils/isAuth";
import { UpdateProfileInput } from "./inputs/ProfileInput";
import { UserInputError } from "apollo-server-errors";
import { capitalizeWords } from "../helpers/capitalizeWords";
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter";
import { UploadedFileResponse } from "./responses/ProfileResponse";
import { S3 } from "aws-sdk";
import { GraphQLUpload } from "graphql-upload";
import { uuidFilenameTransform } from "../helpers/uuidFileNameTransform";
import { Discipline } from "../types/Discipline";
import { UpdateProfileValidationSchema } from "../validations/schemas";
import { validateFields } from "../validations/validateFields";
import sharp from "sharp";

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
    description: "Returns countries",
  })
  async countries() {
    // const regex = new RegExp(`${search}`, "gi");

    // const filtered = countries.filter((item: CountryResponse) => {
    //   return item.country.match(regex);
    // });

    // On the frontend input check if array is empty
    // and if it is don't allow typing of more words since it won't return anything else
    // if this operation is slow move the filter to the frontend and just return countries
    // which it will likely be
    return countries;
  }

  @Query(() => [Discipline], {
    nullable: true,
    description: "Returns disciplines",
  })
  async disciplines(@Ctx() { prisma }: Context) {
    const disciplines = await prisma.discipline.findMany({
      orderBy: [
        {
          title: "asc",
        },
      ],
    });

    return disciplines;
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
    firstName = capitalizeWords(firstName).trim();
    lastName = capitalizeWords(lastName).trim();
    let fullName = (firstName + " " + lastName).trim() || null;
    bio = capitalizeFirstLetter(bio).trim();

    // Validate the input fields
    const errors: LooseObject = await validateFields<UpdateProfileInput>({
      fields: {
        firstName,
        lastName,
        bio,
      },
      validationSchema: UpdateProfileValidationSchema,
    });

    try {
      // Check that country exists by comparing selected country with countries list
      const countryExists = countries.filter(
        (item) => item.country === country
      );

      if (countryExists.length < 1) {
        country = null;
      }

      let fields = {
        firstName,
        lastName,
        fullName,
        country,
        bio,
      };

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
  @UseMiddleware(isAuth)
  async singleUpload(
    @Ctx() { payload, prisma }: Context,
    @Arg("file", () => GraphQLUpload)
    { filename, createReadStream, mimetype, encoding }: Upload
  ): Promise<UploadedFileResponse> {
    // Get current image key before it's been updated.
    const previousImageKey = await prisma.profile
      .findUnique({
        where: {
          userId: payload!.userId,
        },
        select: {
          profileImage: true,
        },
      })
      .then((item) => {
        if (item?.profileImage) {
          const splitted = item.profileImage.split("/");
          return splitted[splitted.length - 1];
        } else {
          return null;
        }
      });

    // Check that image is of type jpeg, jpg, or png
    if (
      mimetype !== "image/jpeg" &&
      mimetype !== "image/jpg" &&
      mimetype !== "image/png"
    ) {
      // Checks that file type is either jpeg, jpg or png
      throw new Error("Image has to be jpeg, jpg or png");
    }

    filename = uuidFilenameTransform(filename);

    // Params for image location, type & size
    const s3DefaultParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Conditions: [
        ["content-length-range", 0, 1024000], // 1 Mb
      ],
      ContentType: "image/jpg,image/jpeg,image/png",
    };

    // Aws credentials
    const s3 = new S3({
      region: process.env.AWS_REGION!,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    });

    // Resizes the image to a size of 250x250
    const transformer = await sharp().resize({
      width: 250,
      height: 250,
      fit: sharp.fit.cover,
      position: sharp.strategy.entropy,
    });

    // Stream for uploading image file from client to server
    const stream = createReadStream().pipe(transformer);

    // Upload image to S3 bucket
    const { Location } = await s3
      .upload({
        ...s3DefaultParams,
        Body: stream,
        Key: filename,
      })
      .promise();

    // Add later to this resolver updating
    await prisma.profile.update({
      where: {
        userId: payload!.userId,
      },
      data: {
        profileImage: Location,
      },
    });

    // Delete previous image from bucket
    if (previousImageKey && Location) {
      // Image bucket location and key
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: previousImageKey,
      };

      // Delete image object from S3 Bucket
      s3.deleteObject(params, function (err, data) {});
    }

    return {
      filename,
      mimetype,
      encoding,
      url: Location,
    };
  }

  @Mutation(() => Profile, {
    description: "Delete Profile Image",
  })
  @UseMiddleware(isAuth)
  async deleteImage(@Ctx() { payload, prisma }: Context) {
    // Get current image key
    const imageKey = await prisma.profile
      .findUnique({
        where: {
          userId: payload!.userId,
        },
        select: {
          profileImage: true,
        },
      })
      .then((item) => {
        if (item?.profileImage) {
          const splitted = item.profileImage.split("/");
          return splitted[splitted.length - 1];
        } else {
          return null;
        }
      });

    // Aws credentials
    const s3 = new S3({
      region: process.env.AWS_REGION!,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    });

    // Delete image if there is a key
    if (imageKey) {
      // Image bucket location and key
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: imageKey,
      };

      // Delete image object from S3 Bucket
      s3.deleteObject(params, function (err, data) {});
    }

    // Update Profile
    const profile = await prisma.profile.update({
      where: {
        userId: payload!.userId,
      },
      data: {
        profileImage: null,
      },
    });

    return profile;
  }

  // https://stackoverflow.com/questions/67736607/how-to-process-uploaded-image-with-graphql-apollo-with-sharpjs-in-nodejs
  // @Mutation(() => Boolean, {
  //   description: "Update File",
  // })
  // // @UseMiddleware(isAuth)
  // async uploadFile(
  //   // @Ctx() { payload, prisma }: Context
  //   @Arg("file", () => GraphQLUpload)
  //   { createReadStream, filename }: Upload
  // ): Promise<Boolean> {
  //   const transformer = sharp().resize({
  //     width: 350,
  //     height: 350,
  //     fit: sharp.fit.cover,
  //     position: sharp.strategy.entropy,
  //   });

  //   return new Promise(async (resolve, reject) =>
  //     createReadStream()
  //       .pipe(transformer)
  //       .pipe(createWriteStream(__dirname + `/../../images/${filename}`))
  //       .on("finish", () => resolve(true))
  //       .on("error", () => reject(false))
  //   );
  // }
}

// --header 'content-type: application/json' \
// --url http://localhost:4000/ \
// --data '{"query":"mutation($uploadFileFile: Upload!) {\n  uploadFile(file: $uploadFileFile)\n}","variables":"{\n  \"uploadFileFile\": null\n}"}'
