module.exports = `

type Category {
  _id: ID
  name: String
  description: String
}

input CreateCategoryInput {
  name: String!
  description: String
}

input UpdateCategoryInput {
  id:ID!
  name: String
  description: String
}

type Query {
  getCategory(id: String, name: String): [Category]!
}
 
type Mutation {
    createCategory(input:CreateCategoryInput!): Category 
    updateCategory(input:UpdateCategoryInput!): Category
}
`;
