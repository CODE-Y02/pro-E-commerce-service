const Category = require("../../../.../../../models/Category");
const getCategory = async (_, { id, name }, context) => {
  const query = {};

  // Filter options
  if (id) query._id = id;
  if (name) query.name = name;

  const categories = await Category.find(query).lean();

  return categories;
};

module.exports = { getCategory };
