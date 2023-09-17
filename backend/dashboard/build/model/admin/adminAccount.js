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
exports.adminSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validator = require("validator");
const crypto_1 = __importDefault(require("crypto"));
// const distributedRoles = new mongoose.Schema<Ipermission>({
//   distributedRoles: {
//     type: String,
//     enum: ["userM", "orderM", "productM"],
//   },
// });
exports.adminSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    // username: {
    //   type: String,
    //   default: () => {
    //     return this.firstName + this.lastName.subString(1, 2).toUpperCase();
    //   },
    // },
    password: {
        type: String,
        minlength: 8,
        required: true,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validator.isEmail, "please provide an email"],
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "superadmin", "user"],
    },
    permission: {
        type: Array,
        required: true,
    },
    passwordResetToken: String,
    passwordTokenExpires: Number,
}, {
    timestamps: true,
});
// pre validate to validate password
exports.adminSchema.pre("validate", function (next) {
    if (this.password !== this.passwordConfirm) {
        return next(new AppError_1.default("password should be same", 400));
    }
    next();
});
// pre save hook to encrpt password
exports.adminSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        this.password = yield bcryptjs_1.default.hash(this.password, 12);
        this.passwordConfirm = undefined;
        next();
    });
});
// to compare hash password with the input password
exports.adminSchema.method("correctPassword", function (candidatePassword, originalpassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(candidatePassword, originalpassword);
    });
});
//generate reset password
exports.adminSchema.method("createResetToken", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const resetToken = crypto_1.default.randomBytes(32).toString("hex");
        this.passwordResetToken = crypto_1.default
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");
        console.log(this.passwordResetToken);
        this.passwordTokenExpires = Date.now() + 10 * 60 * 1000;
        return resetToken;
    });
});
const Admin = mongoose_1.default.model("Admin", exports.adminSchema);
exports.default = Admin;
