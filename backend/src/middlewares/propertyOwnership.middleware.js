import Property from "../models/property.model";

const property = await Property.findById(id);

if (property.owner.toString() !== req.user._id.toString()) {
  throw new ApiError(403, "Unauthorized");
}
