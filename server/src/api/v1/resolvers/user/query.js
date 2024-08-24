const User = require("../../../../models/User");

const findOneUser = async (_, { input }, context) => {
  const { mobile, id: _id, ...rest } = input;
  console.log("DEBUG >>>>>>>>>>>>>> \n", JSON.stringify(input));

  try {
    if (!mobile?.trim() && !_id?.trim()) {
      throw new Error("Either Id or mobile is required");
    }
    const user = await User.findOneUser({ mobile, _id, ...rest });

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Create User: Errr", error.message);
  }
};

const getCart = async (_, __, context) => {
  const userId = context.user.id;
  const cart = await User.findById(userId).select("cart").lean();
  return cart;
};

module.exports = {
  user: findOneUser,
  cart: getCart,
};
