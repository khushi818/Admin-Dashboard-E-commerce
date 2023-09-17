"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const multer_1 = __importDefault(require("../utils/multer"));
const router = express_1.default.Router();
router
    .route("/")
    .post(multer_1.default.single("productImage"), product_1.createProduct)
    .get(product_1.getAllProduct);
router
    .route("/:id")
    .get(product_1.getProductById)
    .delete(product_1.deleteProduct)
    .patch(multer_1.default.single("productImage"), product_1.UpdateProduct);
router
    .route("/image/:id")
    .patch(multer_1.default.single("productImage"), product_1.UpdateProductImage);
exports.default = router;
