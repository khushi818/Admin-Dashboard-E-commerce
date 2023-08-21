import express from "express";
import {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProduct,
  UpdateProduct,
  UpdateProductImage,
} from "../controllers/product";
import singleUpload from "../utils/multer";
const router = express.Router();

router
  .route("/")
  .post(singleUpload.single("productImage"), createProduct)
  .get(getAllProduct);

router
  .route("/:id")
  .get(getProductById)
  .delete(deleteProduct)
  .patch(singleUpload.single("productImage"), UpdateProduct);

router
  .route("/image/:id")
  .patch(singleUpload.single("productImage"), UpdateProductImage);

export default router;
