import { gql } from 'apollo-server-express';
export const userTypes = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    address: String
    email: String
    phoneNumber: String

  }

   type Query {
    getUser(email: String!): User
  }

   type Mutation {
    signup(firstName: String!, lastName: String!, address: String!, email: String!, phoneNumber: String!, password: String!): String
    login(email: String!, password: String!): String
  }
`;
