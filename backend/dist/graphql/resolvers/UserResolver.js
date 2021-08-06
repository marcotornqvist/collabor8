"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
// import { PostCreateInput } from "./PostResolver";
const User_1 = require("../entities/User");
const UserCreateInput_1 = require("./types/UserCreateInput");
const apollo_server_1 = require("apollo-server");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// import { isAuth } from "../utils/isAuth";
let LoginResponse = class LoginResponse {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
__decorate([
    Field(() => User_1.User),
    __metadata("design:type", User_1.User)
], LoginResponse.prototype, "user", void 0);
LoginResponse = __decorate([
    ObjectType()
], LoginResponse);
let UserResolver = class UserResolver {
    users(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield ctx.prisma.user.findMany({
                include: {
                    projects: true,
                },
            });
            return users;
        });
    }
    userById(id, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield ctx.prisma.user.findUnique({
                where: {
                    id: id,
                },
                include: {
                    projects: true,
                },
            });
            return user;
        });
    }
    login(email, password, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user) {
                throw new Error("could not find user");
            }
            const valid = yield compare(password, user.password);
            if (!valid) {
                throw new Error("bad password");
            }
            // login successful
            sendRefreshToken(res, createRefreshToken(user));
            return {
                accessToken: createAccessToken(user),
                user,
            };
        });
    }
    register({ email, firstName, lastName, password, confirmPassword }, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let errors = {};
            try {
                if (email.trim() === "") {
                    errors.email = "Email cannot be empty";
                }
                if (password.length < 6) {
                    errors.password = "Password must be atleast 6 characters";
                }
                else if (password !== confirmPassword) {
                    errors.confirmPassword = "Passwords don't match";
                }
                // Make sure email doesnt already exist
                const emailExists = yield ctx.prisma.user.findUnique({
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
                password = yield bcryptjs_1.default.hash(password, 12);
                // Create user
                const newUser = yield ctx.prisma.user.create({
                    data: {
                        email,
                        firstName,
                        lastName,
                        password,
                    },
                });
                // const token = generateToken(newUser);
                return newUser;
            }
            catch (err) {
                console.log(err);
                throw new apollo_server_1.UserInputError("Errors", { errors });
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userById", null);
__decorate([
    type_graphql_1.Mutation(() => LoginResponse),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Arg("password")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_a = typeof MyContext !== "undefined" && MyContext) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User),
    __param(0, type_graphql_1.Arg("data")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserCreateInput_1.UserCreateInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
