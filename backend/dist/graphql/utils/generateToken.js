"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jwt = require("jsonwebtoken");
const generateToken = (user) => {
    const { id, email } = user;
    return jwt.sign({
        id,
        email,
    }, process.env.PRIVATE_KEY, { expiresIn: "30 days" });
};
exports.generateToken = generateToken;
