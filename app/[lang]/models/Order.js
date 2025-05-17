const { Schema, default: mongoose } = require("mongoose");

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "waiting",
      enum: ["waiting", "inProgress", "completed", "canceled"],
    },

    totalCartPrice: {
      type: String,
      required: true,
    },

    totalDiscount: {
      type: String,
      required: true,
    },

    shippingPrice: {
      type: String,
      required: true,
    },

    orderCode: {
      type: String,
    },

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

    seen: {
      type: Boolean,
      default: false,
    },

    lang: {
      type: String,
      default: "fa",
    },

    currency: {
      type: String,
      default: "ریال",
    },
  },
  {
    timestamps: {
      type: Date,
      default: Date.now(),
    },
  }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
