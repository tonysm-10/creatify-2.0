import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const CREATE_CUSTOMER = gql`
  mutation createCustomer($name: String!, $email: String!, $phone: String!) {
    createCustomer(name: $name, email: $email, phone: $phone) {
      _id
      name
      email
      phone
    }
  }
`;

export const CREATE_PRODUCT = gql`
mutation Mutation($name: String!, $description: String!, $price: Float!, $image: String!, $category: String!, $quantity: Float!,$storeId :String) {
  addProduct(name: $name, description: $description, price: $price, image: $image, category: $category, quantity: $quantity, storeId:$storeId) {
    _id
    name
    description
    price
    image
    category
    quantity
  }
}
`;

export const CREATE_STORE = gql`
mutation Mutation($storeName: String!, $colorBackground: String!, $phoneNumber: Float!, $email: String!, $storeLogo: String!) {
  addStore(storeName: $storeName, colorBackground: $colorBackground, phoneNumber: $phoneNumber, email: $email, storeLogo: $storeLogo) {
    colorBackground
    email
    phoneNumber
    storeLogo
    storeName
  }
}
`;

export const CREATE_ORDER = gql`
  mutation createOrder($productId: ID!, $customerId: ID!, $quantity: Int!) {
    createOrder(productId: $productId, customerId: $customerId, quantity: $quantity) {
      _id
      productId
      customerId
      quantity
      createdAt
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($customerId: ID!, $name: String, $email: String, $phone: String) {
    updateCustomer(customerId: $customerId, name: $name, email: $email, phone: $phone) {
      _id
      name
      email
      phone
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($productId: ID!, $name: String, $description: String, $price: Float, $quantity: Int) {
    updateProduct(productId: $productId, name: $name, description: $description, price: $price, quantity: $quantity) {
      _id
      name
      description
      price
      quantity
    }
  }
`;

export const UPDATE_STORE = gql`
  mutation updateStore($storeId: ID!, $storeName: String, $colorBackground: String, $phoneNumber: Float, $email: String, $storeLogo: String) {
    updateStore(storeId: $storeId, storeName: $storeName, colorBackground: $colorBackground, phoneNumber: $phoneNumber, email: $email, storeLogo: $storeLogo) {
      _id
      storeName
      colorBackground
      phoneNumber
      email
      storeLogo
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($customerId: ID!) {
   deleteCustomer(customerId: $customerId) {
      _id
      name
      email
      phone
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($productId: ID!) {
    deleteProduct(productId: $productId) {
      _id
      name
      description
      price
      quantity
    }
  }
`;

export const DELETE_STORE = gql`
  mutation deleteStore($storeId: ID!) {
    deleteStore(storeId: $storeId) {
      _id
      storeName
      colorBackground
      phoneNumber
      email
      storeLogo
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation deleteOrder($orderId: ID!) {
    deleteOrder(orderId: $orderId) {
      _id
      productId
      customerId
      quantity
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($userId: ID!, $username: String, $email: String, $password: String) {
    updateUser(userId: $userId, username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation updateOrder($orderId: ID!, $productId: ID, $customerId: ID, $quantity: Int) {
    updateOrder(orderId: $orderId, productId: $productId, customerId: $customerId, quantity: $quantity) {
      _id
      productId
      customerId
      quantity
      createdAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
      username
      email
    }
  }
`;