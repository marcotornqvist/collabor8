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
exports.Message = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let Message = class Message {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Message.prototype, "fromId", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Message.prototype, "contactId", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
Message = __decorate([
    type_graphql_1.ObjectType()
], Message);
exports.Message = Message;
