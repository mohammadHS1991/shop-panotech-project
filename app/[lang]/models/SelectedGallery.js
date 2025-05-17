const { Schema, default: mongoose } = require("mongoose");

import { createSelectedGallerySchema } from "../validations/formsValidation";

const selectedGallerySchema = new Schema(
  {
    images: {
      type: Array,
      // required: true,
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

selectedGallerySchema.statics.selectedGalleryValidation = function (body) {
  return createSelectedGallerySchema.validate(body, { abortEarly: false });
};

export default mongoose.models.SelectedGallery ||
  mongoose.model("SelectedGallery", selectedGallerySchema);
