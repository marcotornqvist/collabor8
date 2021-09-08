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
  UpdateEmailInput,
  UpdatePasswordInput,
  UpdateUsernameInput,
  UsersFilterArgs,
} from "./inputs/UserInput";
import { AuthResponse } from "./responses/UserResponse";
import { createAccessToken, createRefreshToken } from "../utils/auth";
import { sendRefreshToken } from "../utils/sendRefreshToken";
import { isAuth } from "../utils/isAuth";
import { makeId } from "../helpers/makeId";
import countries from "../data/countries";
import { pagination } from "../utils/pagination";

// TODO: Remember to implement pagination/infinite scroll both on the back/front end
// so that a query like getAllUsers doesn't return the whole database but instead the first 100

// TODO: Queries/mutations to be implemented:
// users:           Return all users - In Progress (pagination and filtering)
// userbyId:        Return a single user by id - In Progress ()
// loggedInUser:    Return the currently logged in user - Done
// updateUsername:  Update the username - Done
// updateEmail:     Update the email    - In Progress
// updatePassword:  Update the password - Done
// register:        Create a new user - Done
// login:           Login to existing user - Done
// logout:          Logout from the current user - Done
// deleteAccount:   Delete Account - In Progress

// This resolver handles all the user actions such as register & login
@Resolver(User)
export class UserResolver {
  @Query(() => [User], {
    nullable: true,
    description: "Returns all users/profiles that are not disabled",
  })
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
    @Ctx() { prisma }: Context
  ) {
    const filters = {};

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
              firstName: { contains: searchText, mode: "insensitive" },
              lastName: { contains: searchText, mode: "insensitive" },
            },
          },
        ],
      });
    }

    if (disciplines && disciplines.length > 0) {
      Object.assign(filters, {
        profile: {
          disciplineId: {
            in: disciplines,
          },
        },
      });
    }

    const countryExists = countries.filter((item) => item.country === country);

    if (countryExists.length > 0) {
      Object.assign(filters, {
        country,
      });
    }

    return prisma.user.findMany({
      ...pagination({ after, before, first, last }),
      where: {
        ...filters,
        disabled: false,
      },
      include: {
        profile: true,
      },
      orderBy: { createdAt: sort ?? "desc" },
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
    let errors: LooseObject = {};

    try {
      let username = "";
      if (firstName) username += firstName;
      if (lastName) username += lastName;
      username = username.toLowerCase();
      const usernameLength = username.trim().length;

      // Checks that length is between 3 and 41 characters
      // The reason is that "-" and makeId is 9 characters
      // this will make sure that username doesn't exceed the 50 character username limit
      if (usernameLength >= 3 && usernameLength <= 41) {
        // Make sure username doesn't already exist
        const usernameExists = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (usernameExists) {
          username += "-" + makeId(8);

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
        username = makeId(32);
      }

      if (email.trim() === "") {
        errors.email = "Email cannot be empty";
      }

      if (password.length < 6) {
        errors.password = "Password must be atleast 6 characters";
      } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords don't match";
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

      // Hash password and create an auth token
      password = await hash(password, 12);

      // Create user
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password,
          profile: {
            create: {
              firstName,
              lastName,
            },
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
      console.log(err);
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
    const user = await prisma.user.findUnique({
      where: {
        email: email,
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
    @Arg("username") { username }: UpdateUsernameInput,
    @Ctx() { payload, prisma }: Context
  ) {
    const usernameLength = username.trim().length;

    if (usernameLength < 3 && usernameLength > 50) {
      throw new UserInputError(
        "Username has to be longer than 3 characters and less than 50"
      );
    }

    const usernameExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (usernameExists) {
      throw new UserInputError("Username already exists");
    }

    const oldUsername = await prisma.user.findUnique({
      where: {
        id: payload!.userId,
      },
      select: {
        username: true,
      },
    });

    // Updates username and returns contacts
    const user = await prisma.user.update({
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
    });

    const contactsSent = user?.contactsSent.map((item) => item.contactId) ?? [];
    const contactsRcvd = user?.contactsRcvd.map((item) => item.userId) ?? [];
    const contactIds = contactsSent.concat(contactsRcvd);

    // Send a notification to all contacts, that logged in user has changed username
    if (contactIds.length > 0) {
      await prisma.notification.createMany({
        data: contactIds.map((item) => ({
          userId: item,
          message: `${oldUsername?.username} has changed username to ${user.username}`,
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
    @Arg("email") { email }: UpdateEmailInput,
    @Ctx() { payload, prisma }: Context
  ) {
    if (email.trim() === "") {
      throw new UserInputError("Email cannot be empty");
    }

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
    let errors: LooseObject = {};

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

      if (newPassword.length < 6) {
        errors.newPassword = "Password must be atleast 6 characters";
      } else if (newPassword !== confirmPassword) {
        errors.confirmPassword = "Passwords don't match";
      }

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
    sendRefreshToken(res, "");

    return true;
  }

  @Mutation(() => Boolean, {
    description: "Delete Account",
  })
  @UseMiddleware(isAuth)
  async deleteAccount(@Ctx() { res, payload, prisma }: Context) {
    await prisma.user.delete({
      where: {
        id: payload!.userId,
      },
    });

    sendRefreshToken(res, "");

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
