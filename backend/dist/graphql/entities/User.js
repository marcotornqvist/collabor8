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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const Profile_1 = require("./Profile");
const Social_1 = require("./Social");
const Project_1 = require("./Project");
const Contact_1 = require("./Contact");
let User = class User {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    class_validator_1.Length(1, 255),
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "firstName", void 0);
__decorate([
    class_validator_1.Length(1, 255),
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    class_validator_1.MinLength(6),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(() => Profile_1.Profile, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "profile", void 0);
__decorate([
    type_graphql_1.Field(() => Social_1.Social, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "socials", void 0);
__decorate([
    type_graphql_1.Field(() => [Project_1.Project], { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "projects", void 0);
__decorate([
    type_graphql_1.Field(() => [Contact_1.Contact], { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "contacts", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    type_graphql_1.ObjectType()
], User);
exports.User = User;
