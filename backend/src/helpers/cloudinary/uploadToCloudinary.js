import cloudinary from "../../config/cloudinary.config.js";

const uploadToCloudinary = async (file, folder) => {
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
      .end(file.buffer);
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};

export default uploadToCloudinary;
