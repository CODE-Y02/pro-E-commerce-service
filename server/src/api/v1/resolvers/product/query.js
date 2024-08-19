const mongoose = require("mongoose");
const Product = require("../../../../models/Product");

const PRODUCT_SORT = {
  rating_desc: { rating: -1 },
  rating_asc: { rating: 1 },
  price_low_to_high: { price: 1 },
  price_high_to_low: { price: -1 },
  date_add: { createdAt: 1 },
  date_add_desc: { createdAt: -1 },
};

const getProducts = async (_, { input }) => {
  const {
    id,
    name,
    category,
    published,
    limit = 10,
    page = 1,
    sortBy,
    filters = {},
  } = input;

  const query = {};

  if (id) query._id = mongoose.Types.ObjectId(id);
  if (name) query.name = { $regex: name, $options: "i" };
  if (category) query.category = mongoose.Types.ObjectId(category);
  if (published !== undefined) query.published = published;

  try {
    const productsAggregation = Product.aggregate([
      { $match: query },
      {
        $match: {
          ...(filters.includeOutOfStock ? {} : { stock: { $gt: 0 } }),
          ...(filters.colors ? { color: { $in: filters.colors } } : {}),
          ...(filters.size ? { size: { $in: filters.size } } : {}),
          ...(filters.minRating ? { rating: { $gte: filters.minRating } } : {}),
          ...(filters.priceMin || filters.priceMax
            ? {
                price: {
                  ...(filters.priceMin ? { $gte: filters.priceMin } : {}),
                  ...(filters.priceMax ? { $lte: filters.priceMax } : {}),
                },
              }
            : {}),
        },
      },
      ...(sortBy ? [{ $sort: PRODUCT_SORT[sortBy] || { createdAt: -1 } }] : []),
    ]);

    const options = {
      page,
      limit,
      customLabels: {
        totalDocs: "count",
        docs: "products",
        totalPages: "totalPages",
        page: "currentPage",
      },
    };

    const response = await Product.aggregatePaginate(
      productsAggregation,
      options
    );

    // console.log("DEBUG", response);
    return response;
  } catch (error) {
    console.error("getProducts Error:", error);
    throw new Error("Failed to get products");
  }
};

module.exports = { getProducts };
