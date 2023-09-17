"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAccount_1 = require("../controllers/AdminControllers/adminAccount");
const authAdmin_1 = require("../controllers/AdminControllers/authAdmin");
const router = express_1.default.Router();
router.route("/profile/data").get(authAdmin_1.isAuthenticated, 
// authoriseSuperuser as RequestHandler,
(0, authAdmin_1.authoriseRole)("admin", "superadmin"), adminAccount_1.get_profile_data_admin);
exports.default = router;
