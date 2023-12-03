import { gql } from "apollo-server-express";

 export const transactionSchema = gql`
  type Transaction {
    id: ID!
    type: String!
    product: Product
    user: User
  }

  type Query {
    getUserTransactions(userId: ID!): [Transaction]
  }
`;