"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError_1.default(message, 400);
};
const handleDuplicateFieldDB = (err) => {
    const message = `Duplicate field value : Please use other value`;
    return new AppError_1.default(message, 400);
};
const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data, ${errors.join(". ")}`;
    return new AppError_1.default(message, 400);
};
const handleJWTError = () => {
    return new AppError_1.default("Invalid Token, please login again", 401);
};
const handleJWTExpiredError = () => {
    return new AppError_1.default("Your token has expired", 401);
};
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    else {
        res.status(500).json({
            status: "error",
            message: "something went very wrong",
        });
    }
};
exports.default = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    }
    if (process.env.NODE_ENV === "production") {
        let error = err;
        if (err.name === "CastError")
            error = handleCastErrorDB(error);
        if (err.code === 11000)
            error = handleDuplicateFieldDB(error);
        if (err.name === "ValidationError")
            error = handleValidationError(error);
        if (err.name === "JsonWebTokenError")
            error = handleJWTError();
        if (err.name === "TokenExpiredError")
            error = handleJWTExpiredError();
        sendErrorProd(err, res);
    }
};
