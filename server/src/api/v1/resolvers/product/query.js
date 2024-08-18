const Product = require("../../../../models/Product");

const getProducts = async (_, { input }, context) => {
  const {
    id,
    name,
    category,
    published,
    limit = 10,
    page = 1,
    sortBy = "rating",
    filters = { includeOutOfStock: false },
  } = input;
  const query = {};

  // Filter options
  if (id) query._id = id;
  if (name) query.name = { $regex: name, $options: "i" }; // Case-insensitive name search
  if (category) query.category = category;
  if (published !== undefined) query.published = published;

  try {
    let productsAggregation = Product.aggregate([
      // Match products based on query filters
      { $match: query },
      // Lookup variants to filter based on variant fields
      {
        $lookup: {
          from: "variants",
          localField: "variants",
          foreignField: "_id",
          as: "variants",
        },
      },
    ]);

    // Apply additional filtering based on varient fields
    if (filters) {
      if (filters.includeOutOfStock) {
        productsAggregation = productsAggregation.match({
          "variants.stock": { $eq: 0 },
        });
      }
      if (filters.colors && filters.colors.length > 0) {
        productsAggregation = productsAggregation.match({
          "variants.color": { $in: filters.colors },
        });
      }
      if (filters.size && filters.size.length > 0) {
        productsAggregation = productsAggregation.match({
          "variants.size": { $in: filters.size },
        });
      }
      if (filters.minRating) {
        productsAggregation = productsAggregation.match({
          rating: { $gte: filters.minRating },
        });
      }
      if (filters.priceMin || filters.priceMax) {
        const priceFilter = {};
        if (filters.priceMin) priceFilter.$gte = filters.priceMin;
        if (filters.priceMax) priceFilter.$lte = filters.priceMax;
        productsAggregation = productsAggregation.match({
          "variants.price": priceFilter,
        });
      }
    }

    // Sorting
    if (sortBy) {
      if (sortBy === "price") {
        productsAggregation = productsAggregation.addFields({
          minPrice: { $min: "$variants.price" },
          maxPrice: { $max: "$variants.price" },
        });
        sortBy =
          filters && filters.priceSort === "desc" ? "maxPrice" : "minPrice";
      } else if (sortBy === "newlyadded") {
        productsAggregation = productsAggregation.addFields({
          maxDate: { $max: "$variants.createdAt" },
        });
        sortBy = "maxDate";
      }
      const sortOrder = sortBy === "desc" ? -1 : 1;
      productsAggregation = productsAggregation.sort({ [sortBy]: sortOrder });
    }

    // Count the total number of documents matching the query
    const totalCount = await Product.countDocuments(query);

    // Pagination
    const skip = (page - 1) * limit;
    productsAggregation = productsAggregation.skip(skip).limit(limit);

    const products = await productsAggregation.exec();

    return {
      products,
      count: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      limit,
    };
  } catch (error) {
    console.log("getProducts Error:", error);
    throw error;
  }
};

module.exports = { getProducts };
