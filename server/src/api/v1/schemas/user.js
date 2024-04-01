module.exports = `
type User {
  _id: ID
  username: String
  email: String
  mobile: String
  fullName: String
  role: USER_ROLE
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


type Query {
  findOneUser(input :FindOneUserInput!): User
}

type Mutation {
  createUser(input:CreateUserInput!): User
  
  updateUser(input: UpdateUserInput!): User
}
`;
