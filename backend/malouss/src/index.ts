import express from "express";
import ProductRoute from "./routes/product";
import authRoute from "./routes/auth";
import adminRoute from "./routes/admin";
import { v2 as cloudinary } from "cloudinary";
import AppError from "./utils/AppError";
import globalHandler from "./controllers/errorController";
const cookies = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());
app.use(
  cors({
    origin: "*",
  })
);

cloudinary.config({
  cloud_name: `${process.env.Cloud_Name}`,
  api_key: `${process.env.Cloud_Api_Key}`,
  api_secret: `${process.env.Api_Secret}`,
});

app.use("/api/v1/product", ProductRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin", adminRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`cant find the route ${req.originalUrl}`, 404));
});

app.use(globalHandler);

export default app;
