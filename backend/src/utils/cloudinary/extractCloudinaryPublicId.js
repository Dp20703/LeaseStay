const extractCloudinaryPublicId = (url) => {
  const parts = url.split("/");
  const fileName = parts.slice(-2).join("/");

  return fileName.split(".")[0];
};

export default extractCloudinaryPublicId;
