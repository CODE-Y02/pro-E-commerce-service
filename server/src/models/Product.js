const mongoose = require("mongoose");
const uuid = require("uuid");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    rating: Number,
    variants: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Variant",
      },
    ],
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.statics.updateOneProduct = async function (filter, updateData) {
  return await this.findOneAndUpdate(filter, updateData, {
    new: true, // Return the modified document rather than the original.
    runValidators: true, // Ensures that updates are validated against the schema.
  }).lean();
};

// mongoose inbuild method wont filterout undefined values
productSchema.statics.findOneProduct = async function (searchOpts) {
  Object.keys(searchOpts).forEach(
    (key) => searchOpts[key] === undefined && delete searchOpts[key]
  );
  return await this.findOne(searchOpts);
};

module.exports = mongoose.model("Products", productSchema);
