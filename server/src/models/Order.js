const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: { type: Number, min: 1, required: true },
        price: { type: Number, required: true }, // This is the price at time of order
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: [],
    },

    deliveryInfo: {
      status: {
        type: String,
        required: true,
        enum: ["shipped", "delivered", "processing", "cancelled"],
      },
      trackingUrl: String, // Shiping tracking url
    },

    // as scale this sholud be seprate model as user-address that allows user to choose address and auto fill
    shippingAddress: {
      address1: { type: String, required: true },
      address2: { type: String },
      landmark: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: Number, required: true },
      contact: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

// Method to update the order status
orderSchema.methods.updateOrderStatus = async function (newStatus) {
  this.status = newStatus;
  await this.save();
};

// Method to calculate and update the total price of the order
orderSchema.methods.calculateTotalPrice = function () {
  this.totalPrice = this.products.reduce(
    (acc, product) => acc + product.price * product.qty,
    0
  );
  // No need to explicitly save here, should be done by the caller after adjustments
};

// Method to add a product to the order
orderSchema.methods.addProduct = function (product) {
  this.products.push(product);
  this.calculateTotalPrice(); // Recalculate total price
  // Save should be handled by the caller
};

// Method to remove a product from the order
orderSchema.methods.removeProduct = function (productId) {
  const productIndex = this.products.findIndex((product) =>
    product.productId.equals(productId)
  );
  if (productIndex > -1) {
    this.products.splice(productIndex, 1);
    this.calculateTotalPrice(); // Recalculate total price
    // Save should be handled by the caller
  }
};

// Method to update delivery information
orderSchema.methods.updateDeliveryInfo = function (status, trackingUrl = "") {
  this.deliveryInfo.status = status;
  if (trackingUrl) this.deliveryInfo.trackingUrl = trackingUrl;
  // Save should be handled by the caller
};

// export const Order = mongoose.model("Order", orderSchema);

module.exports = mongoose.model("Order", orderSchema);
