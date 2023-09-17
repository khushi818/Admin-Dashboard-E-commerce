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
exports.admin_signout = exports.authoriseSuperuser = exports.authoriseRole = exports.isAuthenticated = exports.ResetPassword = exports.ForgotPassword = exports.admin_login = exports.super_admin_signUp = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const adminAccount_1 = __importDefault(require("../../model/admin/adminAccount"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const admin_1 = require("../../utils/auth/admin");
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { promisify } = require("util");
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
    const admin = yield adminAccount_1.default.findOne({
        email,
    }).select("+password");
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
exports.ForgotPassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // if user exists
    const admin = yield adminAccount_1.default.findOne({
        email: req.body.email,
    });
    if (!admin) {
        return next(new AppError_1.default("admin doesn't exist", 404));
    }
    const resetToken = admin === null || admin === void 0 ? void 0 : admin.createResetToken();
    yield admin.save({ validateBeforeSave: false });
    return res.status(200).json({
        token: resetToken,
        admin,
    });
}));
exports.ResetPassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hashToken = crypto_1.default
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    const admin = yield adminAccount_1.default.findOne({
        passwordResetToken: hashToken,
        passwordTokenExpires: { $gt: Date.now() },
    });
    if (!admin) {
        return next(new AppError_1.default("Token has expired", 401));
    }
    admin.password = req.body.password;
    admin.passwordConfirm = req.body.passwordConfirm;
    admin.passwordTokenExpires = undefined;
    admin.passwordResetToken = undefined;
    yield admin.save();
    const token = (0, admin_1.sendJwtToken)(admin._id);
    res.status(200).json({
        status: "success",
        token,
    });
}));
exports.isAuthenticated = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send("Please login again");
    }
    const decoded = yield promisify(jsonwebtoken_1.default.verify)(token, `${process.env.JWT_SECRET}`);
    // 3) Setting Authenicated User
    const currentUser = yield adminAccount_1.default.findOne({ _id: decoded.id });
    if (!currentUser) {
        return next(new AppError_1.default("admin does not exist", 401));
    }
    req.auth = currentUser;
    console.log(req.auth);
    // 5) Calling next function
    next();
}));
const authoriseRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.auth.role)) {
            return next(new AppError_1.default("You do not permission to access this route", 403));
        }
        next();
    };
};
exports.authoriseRole = authoriseRole;
const authoriseSuperuser = (req, res, next) => {
    if (req.auth.role !== "superadmin") {
        return next(new AppError_1.default("You do not permission to access this route", 403));
    }
    next();
};
exports.authoriseSuperuser = authoriseSuperuser;
exports.admin_signout = (0, catchAsync_1.catchAsync)((req, res, next) => {
    res.cookie("jwt", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    return res.status(200).json({
        status: "success",
        message: "logged out",
    });
});
