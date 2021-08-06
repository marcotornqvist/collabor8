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
exports.Contact = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const Message_1 = require("./Message");
let Contact = class Contact {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Contact.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Contact.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Contact.prototype, "contactId", void 0);
__decorate([
    type_graphql_1.Field(() => [Message_1.Message], { nullable: true }),
    __metadata("design:type", Object)
], Contact.prototype, "messages", void 0);
__decorate([
    type_graphql_1.Field(() => StatusCode) // it's very important
    ,
    __metadata("design:type", String)
], Contact.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], Contact.prototype, "createdAt", void 0);
Contact = __decorate([
    type_graphql_1.ObjectType()
], Contact);
exports.Contact = Contact;
var StatusCode;
(function (StatusCode) {
    StatusCode["NOTFRIEND"] = "NOTFRIEND";
    StatusCode["PENDING"] = "PENDING";
    StatusCode["FRIEND"] = "FRIEND";
})(StatusCode || (StatusCode = {}));
type_graphql_1.registerEnumType(StatusCode, {
    name: "StatusCode",
    description: "Status Code enum", // this one is optional
});
