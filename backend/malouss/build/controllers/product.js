"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductImage = exports.UpdateProduct = exports.deleteProduct = exports.getProductById = exports.getAllProduct = exports.createProduct = void 0;
const product_1 = __importDefault(require("../model/product"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const dataUri_1 = __importDefault(require("../utils/dataUri"));
const catchAsync_1 = require("../utils/catchAsync");
const AppError_1 = __importDefault(require("../utils/AppError"));
// req: POST
// return: product
exports.createProduct = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const fileUri = (0, dataUri_1.default)(file);
    const result = yield cloudinary_1.default.v2.uploader.upload(fileUri.content, {
        folder: "products",
        width: 300,
        crop: "scale",
    });
    const products = yield product_1.default.create(Object.assign({ productImage: {
            public_id: result.public_id,
            url: result.secure_url,
        } }, req.body));
    res.status(200).json({
        status: "success",
        data: products,
    });
}));
// req: GET
// return : all products
exports.getAllProduct = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllProducts = yield product_1.default.find();
    res.status(200).json({
        status: "success",
        data: getAllProducts,
    });
}));
// req: Delete
// return : get products based on Id
exports.getProductById = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getProduct = yield product_1.default.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: getProduct,
    });
}));
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProduct = yield product_1.default.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
        return next(new AppError_1.default("id doesn't exist", 404));
    }
    const { productImage } = deletedProduct;
    if (productImage) {
        const { result } = yield cloudinary_1.default.v2.uploader.destroy(productImage.public_id);
        if (result === "not found")
            return next(new AppError_1.default("Not found", 404));
        if (result !== "ok")
            return next(new AppError_1.default("bad request", 400));
    }
    res.status(200).json({
        status: "success",
        data: deletedProduct,
    });
});
exports.deleteProduct = deleteProduct;
// res : PATCH
// return : update product by id
exports.UpdateProduct = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productExists = yield product_1.default.findById(`${req.params.id}`);
    if (!productExists) {
        return next(new AppError_1.default("product doesn't exist", 404));
    }
    if (req.file) {
        next(new AppError_1.default("this api can't update image", 400));
    }
    const UpdateProduct = yield product_1.default.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
    });
    res.status(200).json({
        status: "success",
        data: UpdateProduct,
    });
}));
// req: patch
// url : image/:id
// return : updated Image
exports.UpdateProductImage = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productImage } = yield product_1.default.findById(req.params.id);
    const { result } = yield cloudinary_1.default.v2.uploader.destroy(productImage.public_id);
    if (result === "not found")
        return next(new AppError_1.default("Not found", 404));
    if (result !== "ok")
        return next(new AppError_1.default("bad request", 400));
    const file = req.file;
    const fileUri = (0, dataUri_1.default)(file);
    const ImageResult = yield cloudinary_1.default.v2.uploader.upload(fileUri.content, {
        folder: "products",
        width: 300,
        crop: "scale",
    });
    const updateImage = yield product_1.default.findByIdAndUpdate(req.params.id, {
        productImage: {
            public_id: ImageResult.public_id,
            url: ImageResult.secure_url,
        },
    }, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: "success",
        data: updateImage,
    });
}));
