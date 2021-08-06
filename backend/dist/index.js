"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./graphql/resolvers/UserResolver");
const apollo_server_1 = require("apollo-server");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const PORT = process.env.PORT || 4000;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use(cookie_parser_1.default());
    app.get("/", (_req, res) => res.send("hello"));
    app.post("/refresh_token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.cookies.jid;
        if (!token) {
            return res.send({ ok: false, accessToken: "" });
        }
        let payload = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
        }
        catch (err) {
            console.log(err);
            return res.send({ ok: false, accessToken: "" });
        }
        // token is valid and
        // we can send back an access token
        const user = yield User.findOne({ id: payload.userId });
        if (!user) {
            return res.send({ ok: false, accessToken: "" });
        }
        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "" });
        }
        sendRefreshToken(res, createRefreshToken(user));
        return res.send({ ok: true, accessToken: createAccessToken(user) });
    }));
    yield createConnection();
    const apolloServer = new apollo_server_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [UserResolver_1.UserResolver],
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log("express server started");
    });
}))();
// const app = async () => {
//   // tq.registerEnumType(SortOrder, {
//   //   name: "SortOrder",
//   // });
//   const schema = await buildSchema({
//     resolvers: [UserResolver, ProjectResolver],
//     scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
//   });
//   new ApolloServer({ schema, context: context }).listen(PORT, () =>
//     console.log(`Server ready at: http://localhost:${PORT}`)
//   );
// };
// app();
