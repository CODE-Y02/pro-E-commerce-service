const Product = require("../../../.../../../models/Product");

const createProduct = async (_, { input }, context) => {
  const { varients, ...rest } = input;
  let productRes;
  const session = await Product.startSession();
  try {
    session.startTransaction();
    // Create variants within the transaction
    const _varients = await Varients.create(varients, { session: session });
    // Create product and include variants
    const product = new Product({ ...rest, varients: _varients });
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

const addVarients = async (_, { input }, context) => {
  const session = await Product.startSession();
  session.startTransaction();

  try {
    const { productId, ...varientsData } = input;

    // Create new variants within the transaction
    const newVarients = await Varients.create(varientsData, { session });

    // Update the product document to push the newly created variant's IDs into the varients array
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $push: {
          varients: { $each: newVarients.map((varient) => varient._id) },
        },
      },
      { new: true, session }
    ).populate("varients");

    // Commit the transaction if all operations succeed
    await session.commitTransaction();
    session.endSession();

    return updatedProduct.varients;
  } catch (error) {
    // If any error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession();

    console.log(error);
    throw error; // Rethrow the error to notify the caller
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

const updateVarient = async (_, { input }, context) => {
  const session = await Varients.startSession();
  session.startTransaction();

  try {
    const { id, ...updateData } = input;

    const updatedVarient = await Varients.findByIdAndUpdate(id, updateData, {
      new: true,
      session,
    });

    await session.commitTransaction();
    session.endSession();

    return updatedVarient;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.log("updateVarient Error:", error);
    throw error;
  }
};

module.exports = {
  createProduct,
  addVarients,
  // updateVarient,
  updateProduct,
};
