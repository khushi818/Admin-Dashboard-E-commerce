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
exports.get_profile_data_admin = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const adminAccount_1 = __importDefault(require("../../model/admin/adminAccount"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
exports.get_profile_data_admin = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield adminAccount_1.default.findOne({ _id: req.auth._id });
    if (!admin) {
        return new AppError_1.default("admin no found ", 404);
    }
    return res.status(200).json({
        status: "success",
        admin,
    });
}));
