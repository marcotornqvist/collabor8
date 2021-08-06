"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRefreshToken = void 0;
const sendRefreshToken = (res, token) => {
    res.cookie("jid", token, {
        httpOnly: true,
        // domain: '.example.com'
        // www.example.com
        // api.example.com
        // path: "/refresh_token"
    });
};
exports.sendRefreshToken = sendRefreshToken;
