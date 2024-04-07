module.exports = `

type Product {
  _id: ID
  name: String
  description: String
  category: ID     
  reviews: [ID]
  ratings: Float
  varients: [ProductVarient]
  published: Boolean
}

type PaginatedProducts {
  products: [Product]
  limit: Int
  currentPage: Int
  totalPages: Int
  count: Int
}

type ProductVarient {
  id: String
  color: String
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
  varients: [VarientInput]!
  published: Boolean = false

}

input UpdateProductInput {
  id:ID!
  name: String
  description: String
  category: ID    
  published: Boolean
}

input VarientInput {
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
  limit: Int
  page: Int
  sortBy: PRODUCT_SORT
}

input addVarientsInput {
  productId: ID!
  varients : [VarientInput]!
}

input updateVarientInput {
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
}

type Query {
  getProducts(input :searchProductInput): PaginatedProducts!
}
 
type Mutation {
    createProduct(input:CreateProductInput!): Product 
    updateProduct(input:UpdateProductInput!): Product
    addVarients(input: addVarientsInput!): ProductVarient
      
}
`;
