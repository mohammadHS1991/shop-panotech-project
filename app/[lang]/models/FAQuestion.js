const { Schema, default: mongoose } = require("mongoose");

import { createFAQuestionSchema } from "../validations/formsValidation";

const FAQuestionSchema = new Schema(
  {
    title: {
      fa: { type: String, required: true, trim: true },
      ar: { type: String, required: true, trim: true },
      en: { type: String, required: true, trim: true, lowercase: true },
    },

    body: {
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
  },
  {
    timestamps: true,
  }
);

FAQuestionSchema.statics.FAQuestionsValidation = function (body) {
  return createFAQuestionSchema.validate(body, { abortEarly: false });
};

export default mongoose.models.FAQuestion ||
  mongoose.model("FAQuestion", FAQuestionSchema);
