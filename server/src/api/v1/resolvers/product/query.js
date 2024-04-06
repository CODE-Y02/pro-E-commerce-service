const Product = require("../../../../models/Product");

const getProducts = async (_, { input }, context) => {
  const { limit = 10, page = 1, sortBy, id, ...rest } = input;

  const products = await Product.find({
    _id: id,
    ...rest,
  }).sort(["desc"]);
};

module.exports = {};
