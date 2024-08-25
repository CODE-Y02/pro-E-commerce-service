const Product = require("../../../.../../../models/Product");
const utils = require("../../utils/");
const createProduct = async (_, { input }, context) => {
  try {
    const product = new Product({ ...input });
    await product.save();
    // Commit the transaction if everything succeeds
    return product;
  } catch (error) {
    console.log("createProduct Err aborting txn", error);
    throw error; // Rethrow the error to notify the caller
  }
};

const updateProduct = async (_, { input }, context) => {
  try {
    const { id, ...updateData } = input;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      utils.removerUndefinedKeysFromObj(updateData)
    );
    return updatedProduct;
  } catch (error) {
    console.log("updateProduct Error:", error);
    throw error;
  }
};

module.exports = {
  createProduct,
  updateProduct,
};
