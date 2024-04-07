const User = require("../../../../models/User");

const createUser = async (_, { input }, context) => {
  try {
    console.log("DEBUG >>>>>>>>>>>>>> \n", JSON.stringify(input));
    const user = await new User(input).lean();

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Create User: Errr", error.message);
  }
};

const updateUser = async (_, { input }, context) => {
  const { mobile, ...updateData } = input;
  try {
    const user = await User.updateOne({ mobile }, updateData);

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Update User: Errr", error.message);
  }
};

const updateCart = async (_, { input }, context) => {
  const { productId, quantity } = input;
  const userId = context.userId;

  try {
    // Find the user by ID and select only the cart field
    const user = await User.findById(userId).select("cart");

    if (!user) {
      throw new Error("User not found");
    }

    // Find the index of the product in the cart
    const cartIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (quantity === 0) {
      // Remove the item from the cart if quantity is zero
      if (cartIndex !== -1) {
        user.cart.splice(cartIndex, 1);
      }
    } else {
      // Update or add the item to the cart
      if (cartIndex !== -1) {
        // Update quantity if product already exists in the cart
        user.cart[cartIndex].quantity = quantity;
      } else {
        // Add new item to the cart
        user.cart.push({ productId, quantity });
      }
    }

    // Save the updated user
    await user.save();

    // Populate the productId field within the cart
    await user.populate("cart.productId").execPopulate();

    // Return the updated cart data only
    return user.cart;
  } catch (error) {
    throw new Error(`Failed to update cart: ${error.message}`);
  }
};

module.exports = {
  createUser,
  updateUser,
  updateCart,
};
