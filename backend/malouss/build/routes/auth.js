"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authAdmin_1 = require("../controllers/AdminControllers/authAdmin");
const router = express_1.default.Router();
router.route("/super/signup").post(authAdmin_1.super_admin_signUp);
router.route("/signin").post(authAdmin_1.admin_login);
exports.default = router;
