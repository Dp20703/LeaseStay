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

    propertyIdentityType: {
      type: String,
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
      enum: ["Active", "Inactive"],

      default: "Active",
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },
  },

  {
    timestamps: true,
  },
);

const Property = mongoose.model("Property", propertySchema);

export default Property;
