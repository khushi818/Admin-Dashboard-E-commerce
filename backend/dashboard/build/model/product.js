"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProuductSchema = new mongoose_1.default.Schema({
    productName: {
        type: String,
        required: true,
    },
    productImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
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
}, {
    timestamps: true,
});
const Product = mongoose_1.default.model("Product", ProuductSchema);
exports.default = Product;
