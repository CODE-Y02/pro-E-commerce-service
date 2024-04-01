module.exports = `

type Product {
  _id: ID
  name: String
  coverImg: String
  additionalImages: [String]
  category: ID
  description: ProductDescription
  productInfo: SubProduct
  isFeatured: Boolean
  ratings: Float
  reviews: [ID]
}

type ProductDescription {
  description: [DescriptionItem]
  specDetails: [SpecDetail]
}

type DescriptionItem {
  heading: String
  text: String
  img: String
}

type SpecDetail {
  specName: String
  specs: [SpecItem]
}

type SpecItem {
  name: String
  value: String
  highlighted: Boolean
}

type SubProduct {
  color: String
  quantity: Int
  img: [String]
  onOffer: Boolean
  priceInfo: ProductPrice
}

type ProductPrice {
  mrp: Float
  currentPrice: Float
  discount: Float
}

# here both Images are actual Img we will upload it to cloud and store url on db later
input CreateProductInput {
  name: String!
  coverImg: String! 
  additionalImages: [String]
  category: ID
  description: ProductDescriptionInput
  productInfo: SubProductInput!
  isFeatured: Boolean

}

input UpdateProductInput {
  name: String
  coverImg: String
  additionalImages: [String]
  category: ID
  productInfo: SubProductInput
  isFeatured: Boolean
  ratings: Float
  reviews: [ID]
}

input ProductDescriptionInput {
  description: [DescriptionItemInput]
  specDetails: [SpecDetailInput]
}

input DescriptionItemInput {
  heading: String
  text: String
  img: String
}

input SpecDetailInput {
  specName: String
  specs: [SpecItemInput]
}

input SpecItemInput {
  name: String
  value: String
  highlighted: Boolean
}

input SubProductInput {
  color: String
  quantity: Int
  img: [String]
  onOffer: Boolean
  priceInfo: ProductPriceInput
}

input ProductPriceInput {
  mrp: Float
  currentPrice: Float
  discount: Float
}

enum ProductStatus {
  IN_STOCK
  OUT_OF_STOCK
  DISCONTINUED
}

  
type Mutation {
    createProduct(input:CreateProductInput!): Product    
}
`;
