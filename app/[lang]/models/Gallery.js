const { Schema, default: mongoose } = require("mongoose");

import { createGallerySchema } from "../validations/formsValidation";

const gallerySchema = new Schema(
  {
    title: {
      fa: { type: String, required: true, trim: true },
      ar: { type: String, required: true, trim: true },
      en: { type: String, required: true, trim: true, lowercase: true },
    },

    slug: {
      fa: { type: String, required: true, trim: true },
      ar: { type: String, required: true, trim: true },
      en: { type: String, required: true, trim: true, lowercase: true },
    },

    status: {
      type: String,
      required: true,
      default: "enable",
      enum: ["enable", "disable"],
    },

    images: {
      type: Array,
      // required: true,
    },

    videos: {
      type: Array,
      //   required: true,
    },

    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

gallerySchema.statics.galleryValidation = function (body) {
  return createGallerySchema.validate(body, { abortEarly: false });
};

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", gallerySchema);
