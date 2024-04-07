const Category = require("../../../.../../../models/Category");

const createCategory = async (_, { input }, context) => {
  const category = await (await Category.create({ ...input })).save();
  console.log(`createCategory Success : ${JSON.stringify(category)}`);

  return category;
};

const updateCategory = async (_, { input }, context) => {
  const { id, ...data } = input;

  const category = await Category.findByIdAndUpdate(id, data).lean();

  console.log(`updateCategory Success : ${JSON.stringify(category)}`);

  return category;
};

module.exports = {
  createCategory,
  updateCategory,
};
