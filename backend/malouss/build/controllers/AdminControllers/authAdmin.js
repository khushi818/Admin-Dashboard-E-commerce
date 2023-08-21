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
exports.admin_signup = exports.admin_login = exports.super_admin_signUp = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const adminAccount_1 = __importDefault(require("../../model/admin/adminAccount"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const admin_1 = require("../../utils/auth/admin");
//super admin signUp
exports.super_admin_signUp = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { permission } = req.body;
    const newSuperAdmin = yield adminAccount_1.default.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        role: req.body.role,
        permission,
    });
    const token = (0, admin_1.sendJwtToken)(newSuperAdmin._id);
    const expire_cookie = process.env.JWT_COOKIE_EXPIRES_IN;
    const cookieOptions = (0, admin_1.storeCookie)(expire_cookie);
    res.cookie("jwt", token, cookieOptions);
    console.log(res.cookie);
    res.status(200).json({
        status: "success",
        token,
    });
}));
exports.admin_login = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError_1.default("please enter email and password", 400));
    }
    // if admin exist
    const admin = yield adminAccount_1.default.findOne({ email });
    if (!admin) {
        return next(new AppError_1.default("admin not found", 404));
    }
    // check the password
    const correct = yield admin.correctPassword(password, admin.password);
    if (!correct) {
        return next(new AppError_1.default("incorrect password", 401));
    }
    const token = (0, admin_1.sendJwtToken)(admin._id);
    const expire_cookie = process.env.JWT_COOKIE_EXPIRES_IN;
    const cookieOptions = (0, admin_1.storeCookie)(expire_cookie);
    res.cookie("jwt", token, cookieOptions);
    console.log(res.cookie);
    res.status(200).json({
        status: "success",
        token,
    });
}));
const admin_signup = (req, res, next) => {
};
exports.admin_signup = admin_signup;
