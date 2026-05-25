import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    zipCode: {
      type: String,
      required: true,
    },

    propertyType: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    bedrooms: {
      type: Number,
      required: true,
    },

    bathrooms: {
      type: Number,
      required: true,
    },

    amenities: [
      {
        type: String,
      },
    ],

    images: [
      {
        type: String,
      },
    ],

    propertyType: {
      type: String,
      enum: ["Apartment", "Villa", "House"],
      required: true,
    },

    propertyProof: {
      type: String,
      required: true,
    },

    identityId: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Apartment", "Villa", "House", "Studio", "PG", "Office"],
      default: "Pending",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    timestamps: true,
  },
);
propertySchema.index({ location: 1 });
propertySchema.index({ category: 1 });
propertySchema.index({ propertyType: 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ owner: 1 });
propertySchema.index({
  title: "text",
  description: "text",
  location: "text",
});

const Property = mongoose.model("Property", propertySchema);

export default Property;
