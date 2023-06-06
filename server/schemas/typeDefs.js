const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    username: String
    email: String
    password: String
    stores: [Store] 
  }

  type Store {
    _id: ID
    storeName: String
    colorBackground: String
    phoneNumber: Float
    email: String
    storeLogo: String
    createdAt: Date
    products: [Product]!
  }

  type Product {
    _id: ID
    name: String
    description: String
    price: Float
    image: String
    category: String
    quantity: Float
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user: User
    stores: [Store]
    store(storeId: ID!): Store
    products: [Product]
    product(productId: ID!): Product
    me: User
    getCurrentDate: Date
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addStore(
      storeName: String!
      colorBackground: String!
      phoneNumber: Float!
      email: String!
      storeLogo: String!
    ): Store
    updateStore(
    storeId: ID!, storeName: String, colorBackground: String, phoneNumber: Float, email: String, storeLogo: String, createdAt: Date
      ): Store
    deleteStore(_id: ID!, storeId: ID!): Store
    addProduct(
      name: String
      description: String
      price: Float
      image: String
      category: String
      quantity: Float
      storeId: String
    ): Product
    updateProduct(
      productId: ID!
      name: String
      description: String
      price: Float
      image: String
      category: String
      quantity: Float
    ): Product
    deleteProduct(_id: ID!, productId: ID!): Product
    addComment(_id: ID!, commentText: String!): Product
    removeComment(_id: ID!, commentId: ID!): Product
  }
`;

module.exports = typeDefs;
