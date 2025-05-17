const { Schema, default: mongoose } = require("mongoose");

import { createNewsSchema } from "../validations/formsValidation";

const newsSchema = new Schema(
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

    firstBody: {
      fa: { type: String, required: true, trim: true },
      ar: { type: String, required: true, trim: true },
      en: { type: String, required: true, trim: true, lowercase: true },
    },

    secondBody: {
      fa: { type: String, required: true, trim: true },
      ar: { type: String, required: true, trim: true },
      en: { type: String, required: true, trim: true, lowercase: true },
    },

    keywords: {
      fa: { type: Array },
      ar: { type: Array },
      en: { type: Array },
    },

    status: {
      type: String,
      required: true,
      default: "enable",
      enum: ["enable", "disable"],
    },

    category: {
      type: String,
      required: true,
      default: "news",
      enum: ["educational", "news"],
    },

    images: {
      type: Array,
      required: true,
    },

    videos: {
      type: Array,
      default: [],
      //   required: true,
    },

    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

newsSchema.statics.newsValidation = function (body) {
  return createNewsSchema.validate(body, { abortEarly: false });
};

export default mongoose.models.News || mongoose.model("News", newsSchema);
