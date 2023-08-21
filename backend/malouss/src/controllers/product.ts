import Product from "../model/product";
import { Request, Response, NextFunction } from "express";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/AppError";

// req: POST
// return: product
export const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;
    const fileUri = getDataUri(file);

    const result: any = await cloudinary.v2.uploader.upload(fileUri.content, {
      folder: "products",
      width: 300,
      crop: "scale",
    });

    const products = await Product.create({
      productImage: {
        public_id: result.public_id,
        url: result.secure_url,
      },

      ...req.body,
    });

    res.status(200).json({
      status: "success",
      data: products,
    });
  }
);

// req: GET
// return : all products
export const getAllProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const getAllProducts = await Product.find();

    res.status(200).json({
      status: "success",
      data: getAllProducts,
    });
  }
);

// req: Delete
// return : get products based on Id
export const getProductById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const getProduct = await Product.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: getProduct,
    });
  }
);

export const deleteProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return next(new AppError("id doesn't exist", 404));
    }

    const { productImage }: any = deletedProduct;

    if (productImage) {
      const { result } = await cloudinary.v2.uploader.destroy(
        productImage.public_id
      );
      if (result === "not found") return next(new AppError("Not found", 404));
      if (result !== "ok") return next(new AppError("bad request", 400));
    }

    res.status(200).json({
      status: "success",
      data: deletedProduct,
    });
  }
);

// res : PATCH
// return : update product by id
export const UpdateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const productExists = await Product.findById(`${req.params.id}`);

    if (!productExists) {
      return next(new AppError("product doesn't exist", 404));
    }

    if (req.file) {
      next(new AppError("this api can't update image", 400));
    }

    const UpdateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: UpdateProduct,
    });
  }
);

// req: patch
// url : image/:id
// return : updated Image
export const UpdateProductImage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productImage }: any = await Product.findById(req.params.id);
    const { result } = await cloudinary.v2.uploader.destroy(
      productImage.public_id
    );

    if (result === "not found") return next(new AppError("Not found", 404));
    if (result !== "ok") return next(new AppError("bad request", 400));

    const file = req.file;
    const fileUri = getDataUri(file);
    const ImageResult: any = await cloudinary.v2.uploader.upload(
      fileUri.content,
      {
        folder: "products",
        width: 300,
        crop: "scale",
      }
    );

    const updateImage = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productImage: {
          public_id: ImageResult.public_id,
          url: ImageResult.secure_url,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: updateImage,
    });
  }
);
