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
exports.Project = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const Member_1 = require("./Member");
const GroupMessage_1 = require("./GroupMessage");
let Project = class Project {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Project.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], Project.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "body", void 0);
__decorate([
    type_graphql_1.Field((type) => User_1.User, { nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "creator", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Project.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(() => [Member_1.Member], { nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "members", void 0);
__decorate([
    type_graphql_1.Field(() => [GroupMessage_1.GroupMessage], { nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "messages", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], Project.prototype, "disabled", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], Project.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date, { nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "updatedAt", void 0);
Project = __decorate([
    type_graphql_1.ObjectType()
], Project);
exports.Project = Project;
