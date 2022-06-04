import cloudinary from "./config.js";
import multer from "multer";

import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "users",
  },
});
const parser = multer({ storage });

export default parser;
