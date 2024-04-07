module.exports = `
type User {
  _id: ID
  username: String
  email: String
  mobile: String
  fullName: String
  role: USER_ROLE
  cart: [CartItem]
  orders: [ID]
  reviews: [ID]
}

type CartWithProduct {
  productId: Product
  quantity: Int
}

type CartItem {
  productId: ID
  quantity: Int
}


enum USER_ROLE {
  Admin
  Support
  User
  Seller
}

input FindOneUserInput{
  username: String 
  email: String
  mobile: String
  role: USER_ROLE
  id: ID
}

input CreateUserInput {
  username: String!
  email: String
  password: String!
  mobile: String!
  fullName: String
  role: USER_ROLE
}

input UpdateUserInput {
  mobile: String!
  username: String
  email: String
  password: String
  fullName: String
  role: USER_ROLE
}

input cartUpdateItemInput {
  productId: ID!
  quantity: Int!
}

type Query {
  findOneUser(input :FindOneUserInput!): User
  getCart: [CartWithProduct]
}

type Mutation {
  createUser(input:CreateUserInput!): User  
  updateUser(input: UpdateUserInput!): User

  # we can combine this with updateuser but it will be complex in PROD LEVEL CART is differnt model 
  
  updateCart(productId:ID !, qty: Int!): [CartWithProduct]!
}
`;
