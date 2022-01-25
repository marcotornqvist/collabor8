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
import { User } from "../types/User";
import { Context, LooseObject } from "../types/Interfaces";
import {
  LoginInput,
  RegisterInput,
  UpdatePasswordInput,
  UsersFilterArgs,
} from "./inputs/UserInput";
import { AuthResponse } from "./responses/UserResponse";
import { createAccessToken, createRefreshToken } from "../utils/auth";
import { deleteRefreshToken, sendRefreshToken } from "../utils/refreshToken";
import { isAuth, isAuthOrNot } from "../utils/isAuth";
import { createUsername } from "../helpers/createUsername";
import { pagination } from "../utils/pagination";
import { capitalizeWords } from "../helpers/capitalizeWords";
import { NotificationCode } from ".prisma/client";
import {
  UsernameValidationSchema,
  RegisterValidationSchema,
  EmailValidationSchema,
  UpdatePasswordValidationSchema,
} from "../validations/schemas";
import { validateFields } from "../validations/validateFields";
import countries from "../data/countries";

// TODO: Queries/mutations to be implemented:
// users:           Return all users - Done
// userbyId:        Return a single user by id - Done
// loggedInUser:    Return the currently logged in user - Done
// updateUsername:  Update the username - Done
// updateEmail:     Update the email    - Done
// updatePassword:  Update the password - Done
// register:        Create a new user - Done
// login:           Login to existing user - Done
// logout:          Logout from the current user - Done
// deleteAccount:   Delete Account - Done

// This resolver handles all the user actions such as register & login
@Resolver(User)
export class UserResolver {
  @Query(() => [User], {
    nullable: true,
    description:
      "Returns all users/profiles except logged in user (if authenticated)",
  })
  @UseMiddleware(isAuthOrNot)
  async users(
    @Arg("data")
    {
      searchText,
      disciplines,
      country,
      after,
      before,
      first,
      last,
      sort,
    }: UsersFilterArgs,
    @Ctx() { prisma, payload }: Context
  ) {
    const filters = {};

    // Don't return logged in user
    if (payload && payload!.userId) {
      Object.assign(filters, {
        NOT: {
          id: payload!.userId,
        },
      });
    }

    if (searchText) {
      Object.assign(filters, {
        OR: [
          {
            username: {
              contains: searchText,
              mode: "insensitive",
            },
          },
          {
            profile: {
              fullName: { contains: searchText, mode: "insensitive" },
            },
          },
        ],
      });
    }

    // Checks if there are disciplines then add disciplines
    if (disciplines && disciplines.length > 0) {
      Object.assign(filters, {
        profile: {
          disciplineId: {
            in: disciplines,
          },
        },
      });
    }

    // Checks that country input exists in countries list
    const countryExists = countries.filter((item) => item.country === country);

    if (countryExists.length > 0) {
      Object.assign(filters, {
        country,
      });
    }

    // Find all users
    return prisma.user.findMany({
      ...pagination({ after, before, first, last }),
      where: {
        ...filters,
        disabled: false,
      },
      include: {
        profile: {
          include: {
            discipline: true,
          },
        },
      },
      orderBy: { createdAt: sort || "desc" },
    });
  }

  @Query(() => User, {
    nullable: true,
    description: "Returns a single user by ID",
  })
  async userById(@Arg("id") id: string, @Ctx() { prisma }: Context) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new UserInputError("User doesn't exist");
    }

    return user;
  }

  @Query(() => User, {
    description: `Returns the "user" data for the user that is currently logged in `,
  })
  @UseMiddleware(isAuth)
  async loggedInUser(@Ctx() { payload, prisma }: Context) {
    const user = await prisma.user.findUnique({
      where: {
        id: payload!.userId,
      },
      include: {
        profile: true,
      },
    });

    return user;
  }

  @Mutation(() => AuthResponse, { description: "Creates a new User" })
  async register(
    @Arg("data")
    { email, firstName, lastName, password, confirmPassword }: RegisterInput,
    @Ctx() { res, prisma }: Context
  ): Promise<AuthResponse> {
    // Validate the input fields
    const errors: LooseObject = await validateFields<RegisterInput>({
      fields: {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      },
      validationSchema: RegisterValidationSchema,
    });

    try {
      let username = "";

      if (firstName) {
        firstName = capitalizeWords(firstName.trim());
        username += firstName;
      }
      if (lastName) {
        lastName = capitalizeWords(lastName.trim());
        username += lastName;
      }

      // Sets username string to lowercase and replaces all whitespace
      username = username.toLowerCase().replace(/ /g, "");

      // Validate username
      const isValid = await UsernameValidationSchema.validate({
        username,
      }).catch(() => false);

      // Checks that length is between 3 and 50 characters
      // The reason is that "-" and createUsername is 9 characters
      // this will make sure that username doesn't exceed the 50 character username limit
      // Make sure username doesn't already exist
      if (isValid) {
        const usernameExists = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (usernameExists) {
          username += "-" + createUsername(8);

          const usernameExistsAgain = await prisma.user.findUnique({
            where: {
              username,
            },
          });

          if (usernameExistsAgain) {
            throw new Error("Server Error");
          }
        }
      } else {
        // if no firstname or lastname was provided create a random id username
        username = createUsername(32);
      }

      // Make sure email doesn't already exist
      const emailExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (emailExists) {
        errors.email = "Email is taken";
      }

      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      // Hash password
      password = await hash(password, 12);

      const fields = {};

      if (firstName || lastName) {
        Object.assign(fields, {
          firstName,
          lastName,
          fullName: ((firstName ?? "") + " " + (lastName ?? "")).trim(),
        });
      }

      // Create user
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password,
          profile: {
            create: fields,
          },
        },
        include: {
          profile: true,
        },
      });

      // Initialize row in socials table based on the new userId
      if (newUser) {
        await prisma.social.create({
          data: {
            userId: newUser.id,
          },
        });
      }

      sendRefreshToken(res, createRefreshToken(newUser));

      return {
        accessToken: createAccessToken(newUser),
        user: newUser,
      };
    } catch (err) {
      // console.log(err);
      throw new UserInputError("Errors", { errors });
    }
  }

  @Mutation(() => AuthResponse, {
    description: "Login to an account",
  })
  async login(
    @Arg("data")
    { email, password }: LoginInput,
    @Ctx() { res, prisma }: Context
  ): Promise<AuthResponse> {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        disabled: false,
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      throw new UserInputError(
        "The email or password you entered is incorrect"
      );
    }

    // Compares and validates the password input with the existing hashed password
    const valid = await compare(password, user.password);

    if (!valid) {
      throw new UserInputError(
        "The email or password you entered is incorrect"
      );
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  @Mutation(() => String, {
    description: "Update Username",
  })
  @UseMiddleware(isAuth)
  async updateUsername(
    @Arg("username") username: string,
    @Ctx() { payload, prisma }: Context
  ) {
    // Sets username to lowercase and removes all whitespace
    username = username.toLowerCase().replace(/ /g, "");

    // Validate username
    await UsernameValidationSchema.validate({
      username,
    });

    // Checks if username already exists
    const usernameExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (usernameExists) {
      throw new UserInputError("Username already exists");
    }

    // Gets the old username for notification
    // const oldUsername = await prisma.user.findUnique({
    //   where: {
    //     id: payload!.userId,
    //   },
    //   select: {
    //     username: true,
    //   },
    // });

    // Updates username and returns contacts
    const contactIds = await prisma.user
      .update({
        where: {
          id: payload!.userId,
        },
        data: { username },
        include: {
          contactsSent: {
            where: {
              status: {
                in: ["TRUE"],
              },
            },
            select: {
              contactId: true,
            },
          },
          contactsRcvd: {
            where: {
              status: {
                in: ["TRUE"],
              },
            },
            select: {
              userId: true,
            },
          },
        },
      })
      .then((users) => {
        const contactsRcvd = users.contactsRcvd.map((item) => item.userId);
        const contactsSent = users.contactsSent.map((item) => item.contactId);
        return contactsRcvd.concat(contactsSent);
      });

    // Send a notification to all contacts, that logged in user has changed username
    if (contactIds.length > 0) {
      await prisma.notification.createMany({
        data: contactIds.map((id) => ({
          senderId: payload!.userId,
          receiverId: id,
          notificationCode: NotificationCode.CONTACT_USERNAME_UPDATED,
        })),
      });
    }

    return username;
  }

  @Mutation(() => String, {
    description: "Update Email",
  })
  @UseMiddleware(isAuth)
  async updateEmail(
    @Arg("email") email: string,
    @Ctx() { payload, prisma }: Context
  ) {
    // Validate email
    await EmailValidationSchema.validate({
      email,
    });

    // Checks if email exists
    const emailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailExists) {
      throw new UserInputError("Email already exists");
    }

    await prisma.user.update({
      where: {
        id: payload!.userId,
      },
      data: { email },
    });

    return email;
  }

  @Mutation(() => Boolean, {
    description: "Update Password",
  })
  @UseMiddleware(isAuth)
  async updatePassword(
    @Arg("data")
    { currentPassword, newPassword, confirmPassword }: UpdatePasswordInput,
    @Ctx() { payload, prisma }: Context
  ) {
    // Validate the input fields
    const errors: LooseObject = await validateFields<
      Omit<UpdatePasswordInput, "currentPassword"> // Doesn't include currentPassword from UpdatePasswordInput interface
    >({
      fields: {
        newPassword,
        confirmPassword,
      },
      validationSchema: UpdatePasswordValidationSchema,
    });

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: payload!.userId,
        },
      });

      const valid = await compare(currentPassword, user!.password);

      if (!valid) {
        errors.currentPassword = "The current password is not correct";
      }

      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      // Hash password and create an auth token
      newPassword = await hash(newPassword, 12);

      await prisma.user.update({
        where: {
          id: payload!.userId,
        },
        data: { password: newPassword },
      });

      return true;
    } catch (err) {
      console.log(err);
      throw new UserInputError("Errors", { errors });
    }
  }

  @Mutation(() => Boolean, {
    description: "Logout from the currently logged in account",
  })
  async logout(@Ctx() { res }: Context) {
    deleteRefreshToken(res);

    return true;
  }

  @Mutation(() => Boolean, {
    description:
      "Sets disabled state to true, which will make user not visible",
  })
  @UseMiddleware(isAuth)
  async deleteAccount(@Ctx() { res, payload, prisma }: Context) {
    // Makes the user disabled and therefore cannot be accessed
    await prisma.user.update({
      where: {
        id: payload!.userId,
      },
      data: {
        disabled: true,
      },
    });

    deleteRefreshToken(res);

    return true;
  }

  // @Mutation(() => Boolean, {description: "Revoke the refreshToken which will sign a user out by id "})
  // async revokeRefreshTokensForUser(
  //   @Arg("id") id: string,
  //   @Ctx() { prisma }: Context
  // ): Promise<Boolean> {
  //   await prisma.user.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       tokenVersion: {
  //         increment: 1,
  //       },
  //     },
  //   });

  //   return true;
  // }
}
