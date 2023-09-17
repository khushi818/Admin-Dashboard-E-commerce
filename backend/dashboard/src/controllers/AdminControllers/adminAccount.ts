import { Response, Request, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import Admin, { Iadmin, IadminDocument } from "../../model/admin/adminAccount";
import AppError from "../../utils/AppError";

interface IGetUserAuthInfoRequest extends Request {
  auth: any; // or any other type
}

export const get_profile_data_admin = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const admin = await Admin.findOne({ _id: req.auth._id });

    if (!admin) {
      return new AppError("admin no found ", 404);
    }

    return res.status(200).json({
      status: "success",
      admin,
    });
  }
);
