const User = require("../../../../models/User");

const createUser = async (_, { input }, context) => {
  try {
    console.log("DEBUG >>>>>>>>>>>>>> \n", JSON.stringify(input));
    const user = await new User(input).save();

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

module.exports = {
  createUser,
  updateUser,
};
