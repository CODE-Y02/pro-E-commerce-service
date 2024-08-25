const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-aggregate-paginate-v2");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    modelNumber: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    color: String,
    imgUrl: String,
    price: { type: Number, required: true },
    size: String,
    stock: { type: Number, min: 0, default: 0 },

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

    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongoosePaginate);

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
