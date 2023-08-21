import { Response, Request, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import Admin from "../../model/admin/adminAccount";
import AppError from "../../utils/AppError";
import { sendJwtToken, storeCookie } from "../../utils/auth/admin";
import { IadminDocument } from "../../model/admin/adminAccount";
import crypto from "crypto";
import jwt from "jsonwebtoken";
const { promisify } = require("util");

export interface IGetUserAuthInfoRequest extends Request {
  auth: any; // or any other type
}

//super admin signUp
export const super_admin_signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { permission } = req.body;
    const newSuperAdmin = await Admin.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      role: req.body.role,
      permission,
    });

    const token: any = sendJwtToken(newSuperAdmin._id);

    const expire_cookie: any = process.env.JWT_COOKIE_EXPIRES_IN;

    const cookieOptions: any = storeCookie(expire_cookie);

    res.cookie("jwt", token, cookieOptions);

    console.log(res.cookie);
    res.status(200).json({
      status: "success",
      token,
    });
  }
);

export const admin_login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("please enter email and password", 400));
    }

    // if admin exist
    const admin: IadminDocument | null = await Admin.findOne({
      email,
    }).select<IadminDocument>("+password");

    if (!admin) {
      return next(new AppError("admin not found", 404));
    }

    // check the password
    const correct: any = await admin.correctPassword(password, admin.password);
    if (!correct) {
      return next(new AppError("incorrect password", 401));
    }

    const token: any = sendJwtToken(admin._id);

    const expire_cookie: any = process.env.JWT_COOKIE_EXPIRES_IN;

    const cookieOptions: any = storeCookie(expire_cookie);

    res.cookie("jwt", token, cookieOptions);

    console.log(res.cookie);
    res.status(200).json({
      status: "success",
      token,
    });
  }
);

export const ForgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // if user exists
    const admin: IadminDocument | null = await Admin.findOne({
      email: req.body.email,
    });

    if (!admin) {
      return next(new AppError("admin doesn't exist", 404));
    }

    const resetToken = admin?.createResetToken();
    await admin.save({ validateBeforeSave: false });

    return res.status(200).json({
      token: resetToken,
      admin,
    });
  }
);

export const ResetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const hashToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const admin: IadminDocument | null = await Admin.findOne({
      passwordResetToken: hashToken,
      passwordTokenExpires: { $gt: Date.now() },
    });

    if (!admin) {
      return next(new AppError("Token has expired", 401));
    }

    admin.password = req.body.password;
    admin.passwordConfirm = req.body.passwordConfirm;
    admin.passwordTokenExpires = undefined;
    admin.passwordResetToken = undefined;

    await admin.save();

    const token = sendJwtToken(admin._id);

    res.status(200).json({
      status: "success",
      token,
    });
  }
);

export const isAuthenticated = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).send("Please login again");
    }

    const decoded = await promisify(jwt.verify)(
      token,
      `${process.env.JWT_SECRET}`
    );

    // 3) Setting Authenicated User
    const currentUser: any = await Admin.findOne({ _id: decoded.id });

    if (!currentUser) {
      return next(new Admin("admin does not exist", 401));
    }

    req.auth = currentUser;
    console.log(req.auth);
    // 5) Calling next function
    next();
  }
);

export const authoriseRole = (...roles: string[]) => {
  return (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.auth.role)) {
      return next(
        new AppError("You do not permission to access this route", 403)
      );
    }
    next();
  };
};

export const authoriseSuperuser = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.auth.role !== "superadmin") {
    return next(
      new AppError("You do not permission to access this route", 403)
    );
  }
  next();
};

export const admin_signout = catchAsync(
  (req: Request, res: Response, next: NextFunction) => {
    res.cookie("jwt", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    return res.status(200).json({
      status: "success",
      message: "logged out",
    });
  }
);
