import mongoose, { Document } from "mongoose";
import AppError from "../../utils/AppError";
import bcrypt from "bcryptjs";
const validator = require("validator");
import crypto from "crypto";

// export interface Ipermission {
//   distributedRoles: string;
// }

export interface Iadmin {
  firstName: string;
  lastName: string;
  // username: string;
  password: string;
  passwordConfirm: string | undefined;
  email: string;
  contactNumber?: number;
  role: string;
  permission: any;
  passwordResetToken: string | undefined;
  passwordTokenExpires: number | undefined;
}

export interface IadminDocument extends Iadmin, Document {
  correctPassword: (
    candidatePassword: string,
    originalpassword: string
  ) => Promise<boolean>;

  createResetToken: () => Promise<string>;
}

// const distributedRoles = new mongoose.Schema<Ipermission>({
//   distributedRoles: {
//     type: String,
//     enum: ["userM", "orderM", "productM"],
//   },
// });

export const adminSchema = new mongoose.Schema<IadminDocument>(
  {
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
  },
  {
    timestamps: true,
  }
);

// pre validate to validate password
adminSchema.pre("validate", function (this, next) {
  if (this.password !== this.passwordConfirm) {
    return next(new AppError("password should be same", 400));
  }
  next();
});

// pre save hook to encrpt password
adminSchema.pre("save", async function (this, next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

// to compare hash password with the input password
adminSchema.method(
  "correctPassword",
  async function (candidatePassword: string, originalpassword: string) {
    return await bcrypt.compare(candidatePassword, originalpassword);
  }
);

//generate reset password
adminSchema.method("createResetToken", async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log(this.passwordResetToken);
  this.passwordTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
});

const Admin = mongoose.model<IadminDocument>("Admin", adminSchema);

export default Admin;
