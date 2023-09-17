import multer from "multer";

const storage: any = multer.memoryStorage();

const singleUpload: any = multer({ storage });

export default singleUpload;
