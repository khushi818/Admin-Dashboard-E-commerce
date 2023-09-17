import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const sendJwtToken = (id: ObjectId) => {
  const token: any = jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

export const storeCookie = (expire_cookie: number) => {
  const cookieOptions: any = {
    expires: new Date(Date.now() + expire_cookie * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  return cookieOptions;
};
