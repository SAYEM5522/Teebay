import { gql } from 'apollo-server-express'

export const productSchema = gql`
  type Product {
    id: ID!
    name: String!
    categories: [String]!
    description: String!
    price: Float!
    isBought: Boolean!
    createdAt: String!
    views: Int!
    rents: [Rent]
    user: User
  }

  type Rent {
    id: ID!
    startTime: String
    endTime: String
    price: Float!
    durationType: String
    product: Product
  }

  type Query {
    getProduct(id: ID!): Product
  }

  type Mutation {
    createProduct(
      name: String!
      categories: [String]!
      description: String!
      price: Float!
      rentPrice: Float!
      rentDuration: String!
    ): Product
    editProduct(
      productId: ID!
      name: String
      categories: [String]
      description: String
      price: Float
      rentPrice: Float
      rentDuration: String
    ): Product
    deleteProduct(productId: ID!): String
    buyProduct(productId: ID!): String
    rentProduct(productId: ID!, startTime: String!, endTime: String!): Rent
    viewProduct(productId: ID!): Product
  }
`;