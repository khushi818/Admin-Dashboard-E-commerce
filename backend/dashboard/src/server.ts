import mongoose, { Error } from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import app from "./index";

const DB: string = (process.env.MONGO_URI as string).replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD as string
);

mongoose.connect(DB).then((): void => {
  console.log("DB successful");
});

const port = process.env.PORT || 8000;

app
  .listen(port, () => {
    console.log(`server is running ${port}`);
  })
  .on("error", (err: Error) => {
    console.log(err);
  });
