const { Schema, default: mongoose } = require("mongoose");

import { createEventSchema } from "../validations/formsValidation";

const eventSchema = new Schema(
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

    images: {
      type: Array,
      required: true,
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

eventSchema.statics.eventValidation = function (body) {
  return createEventSchema.validate(body, { abortEarly: false });
};

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
