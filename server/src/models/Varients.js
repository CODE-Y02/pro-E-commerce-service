const mongoose = require("mongoose");
const uuid = require("uuid");
const { Schema } = mongoose;

const varientSchema = new Schema({
  id: {
    type: String,
    unique: true,
    default: uuid.v1(),
    index: true,
  },
  color: String,
  imgUrl: String,
  price: { type: Number, required: true },
  size: String,
  stock: Number,
});

module.exports = mongoose.model("Varients", varientSchema);
