import mongoose from "mongoose";

interface product {
  productName: string;
  productDescription: string;
  productPrice: number;
  productScndPrice: number;
  productSize?: Array<string>;
  productCategory: Array<string>;
  productStock?: number;
  secondhand?: boolean;
  productImage?: {
    public_id: string;
    url: string;
  };
}

const ProuductSchema = new mongoose.Schema<product>(
  {
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    productDescription: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productScndPrice: {
      type: Number,
      required: true,
    },
    productSize: {
      type: [String],
      default: [],
    },
    secondhand: {
      type: Boolean,
      default: false,
    },
    productCategory: [String],
    productStock: Number,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<product>("Product", ProuductSchema);

export default Product;
