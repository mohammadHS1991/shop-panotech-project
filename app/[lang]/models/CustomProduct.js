const { Schema, default: mongoose } = require("mongoose");

import {
  customProductEditStatusSchema,
  customProductYupSchema,
} from "../validations/formsValidation";

const customProductSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "نام الزامی است"],
      minLength: [2, "نام نمی‌تواند کمتر از 2 کاراکتر باشد"],
      maxLength: [65, "نام نمی‌تواند بیشتر از 65 کاراکتر باشد"],
      lowercase: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "نام خانوادگی الزامی است"],
      minLength: [2, "نام خانوادگی نمی‌تواند کمتر از 2 کاراکتر باشد"],
      maxLength: [65, "نام خانوادگی نمی‌تواند بیشتر از 65 کاراکتر باشد"],
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "ایمیل الزامی است"],
    },

    mobile: {
      type: String,
      required: [true, "شماره موبایل الزامی است"],
    },

    job: {
      type: String,
      required: [true, "شغل الزامی است"],
      minLength: [3, "شغل نمی‌تواند کمتر از 3 کاراکتر باشد"],
      lowercase: true,
      trim: true,
    },

    address: {
      type: String,
      required: [true, "آدرس الزامی است"],
      minLength: [10, "آدرس نمی‌تواند کمتر از 10 کاراکتر باشد"],
      lowercase: true,
      trim: true,
    },

    message: {
      type: String,
      required: [true, "پیام الزامی است"],
      minLength: [10, "پیام نمی‌تواند کمتر از 10 کاراکتر باشد"],
      lowercase: true,
      trim: true,
    },

    postalCode: {
      type: String,
      required: [true, "کد پستی الزامی است"],
      length: [10, "کد پستی باید 10 رقم باشد"],
    },

    status: {
      type: String,
      required: true,
      default: "waiting",
      enum: ["waiting", "inProgress", "completed", "rejected"],
    },
    files: {},
    images: {},

    countryCode: {
      type: String,
      default: "+98",
      required: true,
    },

    country: {
      type: String,
      default: "Iran",
      required: true,
    },

    seen: {
      type: Boolean,
      default: false,
    },

    lang: {
      type: String,
      default: "fa",
    },

    orderCode: {
      type: String,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: {
      type: Date,
      default: Date.now(),
    },
  }
);

customProductSchema.statics.customProductValidation = function (body) {
  return customProductYupSchema.validate(body, { abortEarly: false });
};

customProductSchema.statics.customProductEditStatusValidation = function (
  body
) {
  return customProductEditStatusSchema.validate(body, { abortEarly: false });
};

//? ----------------------- make phone number in format: 9********* --------------------
// customProductSchema.pre("save", function (next) {
//   let customProduct = this;

//   const mobileNum = customProduct.mobile;
//   let formatMobileNum;
//   if (mobileNum.startsWith("09")) {
//     formatMobileNum = mobileNum.slice(1);
//   } else if (mobileNum.startsWith("0098")) {
//     formatMobileNum = mobileNum.slice(4);
//   } else if (mobileNum.startsWith("+98")) {
//     formatMobileNum = mobileNum.slice(3);
//   } else if (mobileNum.startsWith("98")) {
//     formatMobileNum = mobileNum.slice(2);
//   } else {
//     formatMobileNum = mobileNum;
//   }
//   customProduct.mobile = formatMobileNum;
//   next();
// });

// customProductSchema.pre("findOneAndUpdate", function (next) {
//   this.set({ updatedAt: new Date() });
// });

export default mongoose.models.CustomProduct ||
  mongoose.model("CustomProduct", customProductSchema);
