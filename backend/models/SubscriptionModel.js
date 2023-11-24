const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: [true],
    },
    amount_subtotal: {
      type: Number,
      required: [true],
    },
    amount_total: {
      type: Number,
      required: [true],
    },
    email: {
      type: String,
      required: [true],
    },
    name: {
      type: String,
      required: [true],
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    invoice: {
      type: String,
    },
    payment_status: {
      type: String,
      required: [true],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SubscriptionData", subscriptionSchema);
