const Product = require("../../../.../../../models/Product");
const Variant = require("../../../../models/Variant");

const createProduct = async (_, { input }, context) => {
  const { variants, ...rest } = input;
  let productRes;
  const session = await Product.startSession();
  try {
    session.startTransaction();
    // Create variants within the transaction
    const _variants = await Variant.create(variants, { session: session });
    // Create product and include variants
    const product = new Product({ ...rest, variants: _variants });
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

const addVariants = async (_, { input }, context) => {
  const session = await Product.startSession();
  session.startTransaction();

  try {
    const { productId, ...variantsData } = input;

    // Create new variants within the transaction
    const newVariants = await Variant.create(variantsData, { session });

    // Update the product document to push the newly created variant's IDs into the variants array
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $push: {
          variants: { $each: newVariants.map((variant) => variant._id) },
        },
      },
      { new: true, session }
    ).populate("variants");

    // Commit the transaction if all operations succeed
    await session.commitTransaction();
    session.endSession();

    return updatedProduct.variants;
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

const updateVariant = async (_, { input }, context) => {
  const session = await Variant.startSession();
  session.startTransaction();

  try {
    const { id, ...updateData } = input;

    const updatedVariant = await Variant.findByIdAndUpdate(id, updateData, {
      new: true,
      session,
    });

    await session.commitTransaction();
    session.endSession();

    return updatedVariant;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.log("updateVariant Error:", error);
    throw error;
  }
};

module.exports = {
  createProduct,
  addVariants,
  updateVariant,
  updateProduct,
};
