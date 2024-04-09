const user = require("./user");
const product = require("./product");
const category = require("./category");

module.exports = {
  Query: {
    ...user.query,
    ...product.query,
    ...category.query,
  },
  Mutation: {
    ...user.mutation,
    ...product.mutation,
    ...category.mutation,
  },
};
