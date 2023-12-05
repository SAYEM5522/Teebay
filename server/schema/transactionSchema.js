import { gql } from "apollo-server-express";

 export const transactionSchema = gql`
 type Transaction {
  id: ID!
  type: String!
  productId: ID!
  userId: ID!
  product:Product
}

type Query {
  mySales: [Transaction!]!
  myPurchases: [Transaction!]!
}
`;