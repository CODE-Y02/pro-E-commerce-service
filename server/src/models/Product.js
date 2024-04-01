const mongoose = require("mongoose");
const { Schema } = mongoose;

// const productdescriptionSchema = new Schema({
//   description: [
//     {
//       heading: String,
//       text: String,
//       img: String,
//     },
//   ],
//   specDetails: [
//     {
//       specName: { type: String, required: true, default: "General" },
//       specs: [
//         {
//           name: { type: String, required: true },
//           vale: { type: String, required: true },
//           highlighted: Boolean, // this will be used to highlight product spec
//         },
//       ],
//     },
//   ],
// });

// any product can have multiple price like MRP, current price,discount % , etc.
// Here it can go very complex as we scale as discount can be of multiple type
const productPriceSchema = new Schema({
  mrp: {
    type: Number,
    required: true,
  },
  currentPrice: { type: Number, required: true },
  discount: { type: Number, min: 0, default: 0 },
});

const subProductSchema = new Schema({
  // each product can have multiple varient with different qty and price
  color: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    min: 0,
    required: true,
  },

  img: [String],
  onOffer: { type: Boolean, default: false },

  priceInfo: productPriceSchema,
});

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    coverImg: {
      type: String, // cloudinary url
      required: true,
    },
    // additionalImages: [String],

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    // description: productdescriptionSchema,
    productInfo: subProductSchema,

    isFeatured: {
      type: Boolean,
      default: false,
    },
    ratings: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

subProductSchema.methods.isAvailable = function () {
  return this.quantity > 0;
};

subProductSchema.methods.updateStock = async function (quantitySold) {
  this.quantity -= quantitySold;
  await this.save();
};

// Method to calculate the average rating of a product
productSchema.methods.calculateAverageRating = async function () {
  const reviews = await this.model("Review").find({ product: this._id });
  if (reviews.length > 0) {
    const totalRatings = reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    this.ratings = totalRatings / reviews.length;
  } else {
    this.ratings = 0;
  }
  await this.save();
};

// Method to apply a discount to the product
subProductSchema.methods.applyDiscount = function (discountPercentage) {
  if (discountPercentage > 0 && discountPercentage <= 100) {
    this.priceInfo.discount = discountPercentage;
    const discountAmount = (this.priceInfo.mrp * discountPercentage) / 100;
    this.priceInfo.currentPrice = this.priceInfo.mrp - discountAmount;
  }
};

// Method to calculate the final price after discount
subProductSchema.methods.calculateFinalPrice = function () {
  return this.priceInfo.currentPrice; // Assuming discount has already been applied
};

// Method to add a review to a product
productSchema.methods.addReview = async function (reviewId) {
  this.reviews.push(reviewId);
  await this.calculateAverageRating(); // Recalculate average rating after adding a new review
  await this.save();
};

// Static method to find products by category
productSchema.statics.findByCategory = async function (categoryId) {
  return this.find({ category: categoryId });
};

// Method to highlight a specification
// productdescriptionSchema.methods.highlightSpecification = function (
//   specName,
//   specValue
// ) {
//   const specDetail = this.specDetails.find(
//     (detail) => detail.specName === specName
//   );
//   if (specDetail) {
//     const spec = specDetail.specs.find((s) => s.name === specValue);
//     if (spec) {
//       spec.highlighted = true;
//     }
//   }
// };

module.exports = mongoose.model("Product", productSchema);
