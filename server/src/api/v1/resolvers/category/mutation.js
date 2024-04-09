const Category = require("../../../.../../../models/Category");
const { GraphQLError } = require("graphql");
const { ApolloServerErrorCode } = require("@apollo/server/errors");

const createCategory = async (_, { input }, context) => {
  const category = await (await Category.create({ ...input })).save();
  return category;
};

const updateCategory = async (_, { input }, context) => {
  const { id, ...data } = input;

  const category = await Category.findByIdAndUpdate(id, data).lean();

  if (!category) {
    throw new GraphQLError("Invalid Input", {
      extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
    });
  }
  return category;
};

module.exports = {
  createCategory,
  updateCategory,
};
