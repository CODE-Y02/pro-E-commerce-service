module.exports = `

type Product {
  _id: ID
  name: String
  modelNumber: String
  description: String
  color: String
  imgUrl: String
  price: Float
  size: String
  stock: Int
  category: ID     
  reviews: [ID]
  rating: Float
  published: Boolean
  createdAt: String
  updatedAt: String
}

type PaginatedProducts {
  products: [Product]
  limit: Int
  currentPage: Int
  totalPages: Int
  count: Int
  hasPrevPage: Boolean
  hasNextPage: Boolean
}


# here both Images are actual Img we will upload it to cloud and store url on db later
input CreateProductInput {
  name: String!
  modelNumber: String!
  description: String
  category: ID!    
  price: Float!
  stock: Int!
  published: Boolean = false
  imageUrl: String
}

input UpdateProductInput {
  id:ID!
  name: String
  description: String
  category: ID    
  published: Boolean
  price: Float
  stock: Int
  modelNumber: String
  imgUrl: String
}

input searchProductInput {
  id: ID
  name: String
  category: ID     
  published: Boolean
  modelNumber: String
  filters: searchFiltersInput  
  limit: Int
  page: Int
  sortBy: PRODUCT_SORT
}

input searchFiltersInput {
  includeOutOfStock: Boolean 
  minRating: Int
  priceMin: Int
  priceMax : Int
}

enum PRODUCT_SORT {
  rating_desc
  rating_asc
  price_low_to_high
  price_high_to_low
  date_add
  date_add_desc
}


type Query {
  getProducts(input :searchProductInput): PaginatedProducts!
}
 
type Mutation {
    createProduct(input:CreateProductInput!): Product 
    updateProduct(input:UpdateProductInput!): Product

}
`;
