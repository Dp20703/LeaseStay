import cloudinary from "../config/cloudinary.config.js";
import extractCloudinaryPublicId from "./extractCloudinaryPublicId.js";

// DELETE FROM CLOUDINARY

const deleteFromCloudinary = async (imageUrl) => {
  if (!imageUrl || !imageUrl.includes("cloudinary")) {
    return;
  }

  const publicId = extractCloudinaryPublicId(imageUrl);

  await cloudinary.uploader.destroy(publicId);
};

export default deleteFromCloudinary;
