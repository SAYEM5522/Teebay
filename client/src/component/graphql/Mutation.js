import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
export const SIGNUP_MUTATION = gql`
  mutation createUser($firstName: String!, $lastName: String!, $address: String!, $email: String!, $phoneNumber: String!, $password: String!){
  signup(firstName: $firstName, lastName: $lastName, address: $address, email: $email, phoneNumber: $phoneNumber, password: $password)
}
`;
export const CREATE_PRODUCT = gql`
 mutation createProduct($name: String!, $categories: [String]!, $description: String!, $price: Float!, $rentPrice: Float!, $rentDuration: String!){
  createProduct(name: $name, categories: $categories, description: $description, price: $price, rentPrice: $rentPrice, rentDuration: $rentDuration) {
    id
  }
}
`;
export const EDIT_PRODUCT = gql`
mutation editProduct($productId: ID!,$editProductName2: String,$description: String,$categories: [String],$price: Float,$rentDuration: String,$rentPrice: Float,){
  editProduct(productId: $productId,name: $editProductName2,description: $description,categories: $categories,price: $price,rentDuration: $rentDuration,rentPrice: $rentPrice) {
    name
    id
    description
    views
    isBought
    createdAt
    categories
    rents {
      durationType
      price
    }
    price
  }
}

`;
export const DELETE_PRODUCT = gql`
mutation deleteProduct($productId: ID!){
  deleteProduct(productId: $productId)
}

`;
export const BUY_PRODUCT= gql`
mutation buyProduct($productId: ID!){
  buyProduct(productId: $productId)
}
`;
export const VIEW_PRODUCT=gql`
mutation viewProduct($productId: ID!){
  viewProduct(productId: $productId) {
    id
    views
  }
}
`
export const RENT_PRODUCT=gql`
mutation rentProduct($productId: ID!, $startTime: String!, $endTime: String!){
  rentProduct(productId: $productId, startTime: $startTime, endTime: $endTime) {
    product {
      name
      rents {
        durationType
        endTime
        startTime
      }
    }
  }
}
`

