const { Schema, default: mongoose } = require("mongoose");
import bcrypt from "bcrypt";

import {
  editUserRoleSchema,
  personalInfoSchema,
  registerSchema,
} from "../validations/formsValidation";

const userSchema = new Schema(
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
      unique: true,
    },

    mobile: {
      type: String,
      required: [true, "شماره موبایل الزامی است"],
    },

    postalCode: {
      type: String,
      // default: " ",
      length: [10, "کد پستی باید 10 رقم باشد"],
    },

    job: {
      type: String,
      // default: " ",
      minLength: [3, "شغل نمی‌تواند کمتر از 3 کاراکتر باشد"],
      maxLength: [65, "شغل نمی‌تواند بیشتر از 65 کاراکتر باشد"],
      lowercase: true,
      trim: true,
    },

    field: {
      type: String,
      // default: " ",
      minLength: [3, "رشته تحصیلی نمی‌تواند کمتر از 3 کاراکتر باشد"],
      maxLength: [65, "رشته تحصیلی نمی‌تواند بیشتر از 65 کاراکتر باشد"],
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "رمز عبور الزامی است"],
    },

    address: {
      type: String,
      minLength: [8, "آدرس نمی‌تواند کمتر از 5 کاراکتر باشد"],
      lowercase: true,
      trim: true,
    },

    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "operator"],
    },

    resetToken: {
      type: String,
      required: false,
    },

    resetTokenExpiry: {
      type: Date,
      required: false,
    },

    openCart: [
      {
        _id: false,
        // productId: { type: mongoose.Schema.Types.ObjectId },
        qty: {
          type: Number,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],

    canceledCarts: {
      type: Array,
    },

    finishedCarts: [
      {
        cart: [
          {
            _id: false,
            qty: {
              type: Number,
            },
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
            },
          },
        ],

        status: {
          type: String,
          required: true,
          default: "waiting",
          enum: ["waiting", "inProgress", "completed", "canceled"],
        },

        totalCartPrice: {
          type: String,
        },

        totalDiscount: {
          type: String,
        },

        shippingPrice: {
          type: String,
        },

        currency: {
          type: String,
          default: "ریال",
        },

        date: {
          type: Date,
          default: new Date(),
        },

        orderCode: {
          type: String,
        },
      },
    ],

    customProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CustomProduct",
      },
    ],

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

    lang: {
      type: String,
      default: "fa",
    },

    verified: {
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

userSchema.statics.userValidation = function (body) {
  return registerSchema.validate(body, { abortEarly: false });
};

userSchema.statics.userInfoValidation = function (body) {
  return personalInfoSchema.validate(body, { abortEarly: false });
};

userSchema.statics.userRoleValidation = function (body) {
  return editUserRoleSchema.validate(body, { abortEarly: false });
};

//? ----------------------- hash password before saving --------------------
userSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

//? ----------------------- make phone number in format: 9********* --------------------
// userSchema.pre("save", function (next) {
//   let user = this;

//   const mobileNum = user.mobile;
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
//   user.mobile = formatMobileNum;
//   next();
// });

export default mongoose.models.User || mongoose.model("User", userSchema);
