module.exports = `

type Product {
  _id: ID
  name: String
  description: String
  category: ID     
  reviews: [ID]
  ratings: Float
  variants: [ProductVariant]
  published: Boolean
}

type PaginatedProducts {
  products: [Product]
  limit: Int
  currentPage: Int
  totalPages: Int
  count: Int
}

type ProductVariant {
  id: String
  color: String
  name: String
  description: [String]
  imgUrl: String
  price: Float
  size: String
  stock: Int
}

# here both Images are actual Img we will upload it to cloud and store url on db later
input CreateProductInput {
  name: String!
  description: String
  category: ID!    
  variants: [VariantInput]!
  published: Boolean = false

}

input UpdateProductInput {
  id:ID!
  name: String
  description: String
  category: ID    
  published: Boolean
}

input VariantInput {
  color: String!
  image: String
  price: Float!
  size: String
  stock: Int!
}

input searchProductInput {
  id: ID
  name: String
  category: ID     
  published: Boolean
  filters: searchFiltersInput  
  limit: Int
  page: Int
  sortBy: PRODUCT_SORT 
}

input searchFiltersInput {
  includeOutOfStock: Boolean
  color: [String]
  minRating: Int
  priceMin: Int
  priceMax : Int
  priceSort: SORT_ORDER
}

input addVVariantInput {
  productId: ID!
  variants : [VariantInput]!
}

input updateVariantInput {
 id: ID!    
 color: String
 image: String
 price: Float
 size: String
 stock: Int
}

enum PRODUCT_SORT {
  rating
  price
  newlyadded
}

enum SORT_ORDER {
  desc
  asc
}

type Query {
  getProducts(input :searchProductInput): PaginatedProducts!
}
 
type Mutation {
    createProduct(input:CreateProductInput!): Product 
    updateProduct(input:UpdateProductInput!): Product

    # Variants Methods
    addVariants(input: addVariantInput!): ProductVariant
    updateVariant(input: updateVariantInput!): ProductVariant

}
`;
