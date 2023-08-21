import express, { RequestHandler } from "express";
import { get_profile_data_admin } from "../controllers/AdminControllers/adminAccount";
import {
  isAuthenticated,
  authoriseRole,
  authoriseSuperuser,
} from "../controllers/AdminControllers/authAdmin";
const router = express.Router();

router.route("/profile/data").get(
  isAuthenticated,
  // authoriseSuperuser as RequestHandler,
  authoriseRole("admin", "superadmin") as RequestHandler,
  get_profile_data_admin
);

export default router;
