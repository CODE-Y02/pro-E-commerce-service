const Product = require("../../../../models/Product");

const PRODUCT_SORT = {
  rating_desc: "rating_desc",
  rating_asc: "rating_asc",
  price_low_to_high: "price_low_to_high",
  price_high_to_low: "price_high_to_low",
  date_add: "date_add",
  date_add_desc: "date_add_desc",
};

const getProducts = async (_, { input }, context) => {
  const {
    id,
    name,
    category,
    published,
    limit = 10,
    page = 1,
    sortBy,
    filters = { includeOutOfStock: false },
  } = input;
  const query = {};

  // Basic filters
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
      // Unwind variants to filter and sort them individually
      { $unwind: { path: "$variants", preserveNullAndEmptyArrays: true } }, // Change: Added $unwind to handle variant filtering
    ]);

    // Apply additional filtering based on variant fields
    if (filters) {
      if (filters.includeOutOfStock) {
        productsAggregation = productsAggregation.match({
          $or: [
            { "variants.stock": { $exists: false } },
            { "variants.stock": { $gt: 0 } },
          ],
        });
      } else {
        productsAggregation = productsAggregation.match({
          $or: [{ "variants.stock": { $gt: 0 } }],
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
      switch (sortBy) {
        case PRODUCT_SORT.price_low_to_high:
          // Add field for minimum price and sort
          productsAggregation = productsAggregation.addFields({
            minPrice: { $min: "$variants.price" },
          });
          productsAggregation = productsAggregation.sort({ minPrice: 1 });
          break;

        case PRODUCT_SORT.price_high_to_low:
          // Add field for maximum price and sort
          productsAggregation = productsAggregation.addFields({
            maxPrice: { $max: "$variants.price" },
          });
          productsAggregation = productsAggregation.sort({ maxPrice: -1 });
          break;

        case PRODUCT_SORT.rating_asc:
          // Sort by rating ascending
          productsAggregation = productsAggregation.sort({ rating: 1 });
          break;

        case PRODUCT_SORT.rating_desc:
          // Sort by rating descending
          productsAggregation = productsAggregation.sort({ rating: -1 });
          break;

        case PRODUCT_SORT.date_add:
          // Sort by creation date ascending
          productsAggregation = productsAggregation.sort({ createdAt: 1 });
          break;

        case PRODUCT_SORT.date_add_desc:
          // Sort by creation date descending
          productsAggregation = productsAggregation.sort({ createdAt: -1 });
          break;

        default:
          break;
      }
    }

    // Count the total number of documents matching the query
    const totalCount = await Product.countDocuments(query);

    // Pagination
    const skip = (page - 1) * limit;
    productsAggregation = productsAggregation.skip(skip).limit(limit);

    // Execute the aggregation pipeline
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
