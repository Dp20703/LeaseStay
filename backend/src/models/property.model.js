import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
    },
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
        url: String,
        publicId: String,
      },
    ],

    thumbnail: {
      url: String,
      publicId: String,
    },

    propertyType: {
      type: String,
      enum: ["Apartment", "Villa", "House", "Studio", "PG", "Office"],
      required: true,
    },

    propertyDocuments: [
      {
        type: {
          type: String,
          enum: [
            "sale_deed",
            "tax_receipt",
            "electricity_bill",
            "rental_agreement",
          ],
        },

        url: String,
        publicId: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    verifiedAt: Date,

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    verificationRejectedReason: {
      type: String,
    },

    status: {
      type: String,
      enum: ["draft", "Pending", "Approved", "Rejected", "Hidden", "Inactive"],
      default: "Pending",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    availabilityStatus: {
      type: String,
      enum: ["available", "occupied", "reserved"],
      default: "available",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    coordinates: {
      type: [Number],
      index: "2dsphere",
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

// SOFT DELETE

propertySchema.pre(/^find/, function () {
  if (!this.getOptions().includeDeleted) {
    this.find({
      isDeleted: false,
    });
  }
});

const Property = mongoose.model("Property", propertySchema);

export default Property;
