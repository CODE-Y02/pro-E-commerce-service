const Product = require("../../../.../../../models/Product");

const createProduct = async (_, { input }, context) => {
  let productRes;
  const session = await Product.startSession();
  try {
    session.startTransaction();
    const product = new Product({ ...input, imgUrl: input?.imageUrl });
    // Save the product within the transaction
    productRes = await product.save({ session: session });
    // Commit the transaction if everything succeeds
    await session.commitTransaction();
  } catch (error) {
    // Rollback the transaction if an error occurs
    await session.abortTransaction();
    console.log("createProduct Err aborting txn", error);
    throw error; // Rethrow the error to notify the caller
  } finally {
    session.endSession();
    return productRes;
  }
};

const updateProduct = async (_, { input }, context) => {
  const session = await Product.startSession();
  session.startTransaction();

  try {
    const { id, ...updateData } = input;

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      session,
    });

    await session.commitTransaction();
    session.endSession();

    return updatedProduct;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.log("updateProduct Error:", error);
    throw error;
  }
};

module.exports = {
  createProduct,
  // addVariants,
  // updateVariant,
  updateProduct,
};
