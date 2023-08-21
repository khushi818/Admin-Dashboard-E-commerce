"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./config.env" });
const index_1 = __importDefault(require("./index"));
const DB = process.env.MONGO_URI.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose_1.default.connect(DB).then(() => {
    console.log("DB successful");
});
const port = process.env.PORT || 8000;
index_1.default
    .listen(port, () => {
    console.log(`server is running ${port}`);
})
    .on("error", (err) => {
    console.log(err);
});
