const { Schema, default: mongoose } = require("mongoose");

import {
  addProductCommentSchema,
  createProductSchema,
  editProductCommentSchema,
} from "../validations/formsValidation";

const productSchema = new Schema(
  {
    name: {
      fa: { type: String, required: true, trim: true },
      ar: { type: String, required: true, trim: true },
      en: { type: String, required: true, trim: true, lowercase: true },
    },
    slug: {
      fa: { type: String, required: true, trim: true },
      ar: { type: String, required: true, trim: true },
      en: { type: String, required: true, trim: true, lowercase: true },
    },

    fullDescription: {
      fa: { type: String, required: true, trim: true },
      ar: { type: String, required: true, trim: true },
      en: { type: String, required: true, trim: true, lowercase: true },
    },

    useCases: {
      fa: { type: String, required: true, trim: true },
      ar: { type: String, required: true, trim: true },
      en: { type: String, required: true, trim: true, lowercase: true },
    },

    price: {
      fa: {
        amount: { type: String, required: true, trim: true },
        unit: {
          type: String,
          default: "ریال",
        },
        discount: { type: String, required: true, trim: true, default: "0" },
      },
      en: {
        amount: { type: String, required: true, trim: true },
        unit: {
          type: String,
          default: "$",
        },
        discount: { type: String, required: true, trim: true, default: "0" },
      },
      ar: {
        amount: { type: String, required: true, trim: true },
        unit: {
          type: String,
          default: "$",
        },
        discount: { type: String, required: true, trim: true, default: "0" },
      },
    },

    keywords: {
      fa: { type: Array },
      ar: { type: Array },
      en: { type: Array },
    },

    qty: {
      type: String,
      required: true,
      trim: true,
    },

    soldQty: {
      type: String,
      required: true,
      trim: true,
      default: "0",
    },

    status: {
      type: String,
      required: true,
      default: "1",
      enum: ["1", "0"],
    },

    special: {
      type: String,
      required: true,
      default: "0",
      enum: ["1", "0"],
    },

    comments: [
      {
        // _id: true,
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        comment: {
          type: String,
          required: true,
          trim: true,
          lowercase: true,
        },
        status: {
          type: Boolean,
          required: true,
          default: 0,
        },
        date: {
          type: Date,
          default: new Date(),
        },
      },
    ],

    // images: [new Schema({ src: { type: String, required: true } })],
    images: {},
    guideImages: {},
    guideVideos: {},
    files: {},

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

productSchema.statics.productValidation = function (body) {
  return createProductSchema.validate(body, { abortEarly: false });
};

productSchema.statics.addProductCommentValidation = function (body) {
  return addProductCommentSchema.validate(body, { abortEarly: false });
};

productSchema.statics.editProductCommentValidation = function (body) {
  return editProductCommentSchema.validate(body, { abortEarly: false });
};

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
