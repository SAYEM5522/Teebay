import { gql } from '@apollo/client';

export const USER_PRODUCTS = gql`
  query getUserProduct{
  userProducts {
    name
    categories
    createdAt
    price
    views
    id
    description
    rents {
      price
      durationType
    }
  }
}
`;

export const GET_PRODUCT = gql`
  query getProduct($getProductId: ID!){
  getProduct(id: $getProductId) {
    name
    description
    categories
    price
    isBought
    rents {
      durationType
      price
    }

  }
}
`;

export const GET_ALL_PRODUCTS=gql`
query allProdut{
  getAllproducts {
    name
    description
    price
    createdAt
    id
    isBought
    views
    categories
    rents {
      durationType
      price
    }
  }
}

`
export const MY_SALES=gql`
query mySales {
  mySales {
    product {
      description
      name
      price
      categories
      views
      rents {
        price
        durationType
      }
    }
  }
}
`
export const MY_BOUGHT=gql`
query myPurchases{
  myPurchases {
    product {
      createdAt
      description
      name
      price
      categories
      views
      rents {
        durationType
        price
      }
    }
  }
}
`