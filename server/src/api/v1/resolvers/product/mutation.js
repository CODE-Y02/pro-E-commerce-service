const Product = require("../../../../models/Product");

const createProduct = async (_, { input }, context) => {
  try {
    // console.log("DEBUG >>>>>>>>>>>>>> \n", JSON.stringify(input));

    const user = await new Product(input).save();

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Create User: Errr", error.message);
  }
};

const updateroduct = async (_, { input }, context) => {
  const { mobile, ...updateData } = input;
  try {
    const user = await User.updateOne({ mobile }, updateData);

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Update User: Errr", error.message);
  }
};

module.exports = {
  createProduct,
  // updateroduct,
};
