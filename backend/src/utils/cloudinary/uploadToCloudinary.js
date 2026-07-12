import cloudinary from "../../config/cloudinary.config.js";

const uploadToCloudinary = async (file, folder) => {
  try {
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
  } catch (error) {
    if (error.http_code === 400) {
      throw new ApiError(400, error.message || "Cloudinary upload failed");
    }

    throw new ApiError(500, "File upload failed");
  }
};

export default uploadToCloudinary;
