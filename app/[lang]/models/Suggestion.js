const { Schema, default: mongoose } = require("mongoose");

import { questionSchema } from "../validations/formsValidation";

const suggestionModelSchema = new Schema(
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
      // minLength: [3, "شغل نمی‌تواند کمتر از 3 کاراکتر باشد"],
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
  },
  {
    timestamps: {
      type: Date,
      default: Date.now(),
    },
  }
);

suggestionModelSchema.statics.suggestionValidation = function (body) {
  return questionSchema.validate(body, { abortEarly: false });
};

//? ----------------------- make phone number in format: 9********* --------------------
// suggestionModelSchema.pre("save", function (next) {
//   let question = this;

//   const mobileNum = question.mobile;
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
//   question.mobile = formatMobileNum;
//   next();
// });

export default mongoose.models.Suggestion ||
  mongoose.model("Suggestion", suggestionModelSchema);
