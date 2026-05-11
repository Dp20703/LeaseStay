import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.config.js";

const uploadToCloudinary = (fileBuffer,folder = "LeaseStay") => {

  return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {folder,resource_type: "auto",},
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      streamifier.createReadStream(fileBuffer).pipe(stream);
    }
  );
};

export default uploadToCloudinary;