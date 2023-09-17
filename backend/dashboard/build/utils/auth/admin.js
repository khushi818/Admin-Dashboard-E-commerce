"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeCookie = exports.sendJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendJwtToken = (id) => {
    const token = jsonwebtoken_1.default.sign({ id }, `${process.env.JWT_SECRET}`, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
};
exports.sendJwtToken = sendJwtToken;
const storeCookie = (expire_cookie) => {
    const cookieOptions = {
        expires: new Date(Date.now() + expire_cookie * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === "production")
        cookieOptions.secure = true;
    return cookieOptions;
};
exports.storeCookie = storeCookie;
