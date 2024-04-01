const user = require("./user");
const product = require("./product");

module.exports = {
  Query: {
    ...user.query,
    ...product.query,
  },
  Mutation: {
    ...user.mutation,
    ...product.mutation,
  },
};
