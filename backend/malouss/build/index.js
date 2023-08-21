"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("./routes/product"));
const auth_1 = __importDefault(require("./routes/auth"));
const cloudinary_1 = require("cloudinary");
const AppError_1 = __importDefault(require("./utils/AppError"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
cloudinary_1.v2.config({
    cloud_name: `${process.env.Cloud_Name}`,
    api_key: `${process.env.Cloud_Api_Key}`,
    api_secret: `${process.env.Api_Secret}`,
});
app.use("/api/v1/product", product_1.default);
app.use("/api/v1/admin", auth_1.default);
app.all("*", (req, res, next) => {
    next(new AppError_1.default(`cant find the route ${req.originalUrl}`, 404));
});
app.use(errorController_1.default);
exports.default = app;
