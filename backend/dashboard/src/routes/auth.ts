import express from "express";
import {
  super_admin_signUp,
  admin_login,
  ForgotPassword,
  ResetPassword,
  admin_signout,
  add_admin,
} from "../controllers/AdminControllers/authAdmin";
const router = express.Router();

router.route("/super/signup").post(super_admin_signUp);
router.route("/signin").post(admin_login);
router.route("/forgotPassword").post(ForgotPassword);
router.route("/resetPassword/:token").patch(ResetPassword);
router.route("/signout").post(admin_signout);
router.route("/super/createadmin").post(add_admin);

export default router;
