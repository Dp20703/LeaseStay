import cloudinary from "../../config/cloudinary.config.js";

// DELETE FROM CLOUDINARY

const deleteFromCloudinary = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

export default deleteFromCloudinary;
