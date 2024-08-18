const mongoose = require("mongoose");
const uuid = require("uuid");
const { Schema } = mongoose;

const variantSchema = new Schema({
  id: {
    type: String,
    unique: true,
    default: uuid.v1(),
    index: true,
  },
  name: String,
  description: [String],
  color: String,
  imgUrl: String,
  price: { type: Number, required: true },
  size: String,
  stock: Number,
});

module.exports = mongoose.model("Variant", variantSchema);
