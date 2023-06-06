const { AuthenticationError } = require('apollo-server-express');
const { User, Store, Product } = require('../models');
const { signToken } = require('../utils/auth');
const { GraphQLScalarType, Kind } = require('graphql');

const resolvers = {
  // Add the Date scalar type here
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10));
      }
      return null;
    },
  }),

  Query: {
    stores: async () => {
      return Store.find().populate('products');
    },
    store: async (parent, { storeId }) => {
      return Store.findOne({ _id: storeId }).populate('products');
    },
    products: async () => {
      return Product.find();
    },
    product: async (parent, { productId }) => {
      return Product.findOne({ _id: productId });
    },

    users: async () => {
      return User.find().populate('stores').populate({
        path:"stores",
        populate:"products"
      });
    },
    // user: async (parent, { storeId }) => {
    //   return User.findOne({ _id: storeId }).populate('stores').populate({
    //     path:"stores",
    //     populate:"products"
    //   });
    // },

    user: async (parent, arg,context) => {
      return User.findOne({ _id:context.user._id }).populate('stores').populate({
        path:"stores",
        populate:"products"
      });
    },


    me: async (parent, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addStore: async (parent, { storeName, colorBackground, phoneNumber, email, storeLogo }, context) => {
      if (context.user) {
        const store = await Store.create({
          storeName,
          colorBackground,
          phoneNumber,
          email,
          storeLogo,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { stores: store._id } }
        );

        return store;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addProduct: async (parent, { storeId, name, description, price, image, category, quantity }, context) => {
      console.log("Adding product")
      if (context.user) {
        const product = await Product.create({
          name,
          description,
          price,
          image,
          category, 
          quantity,
          
      
        });

        await Store.findOneAndUpdate(
          { _id: storeId },
          { $addToSet: { products: product._id } }
        );

        return product;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteProduct: async (parent, { productId }, context) => {
      if (context.user) {
        const product = await Product.findOneAndDelete({
          _id: productId,
        });

        await Store.findOneAndUpdate(
          { _id: product.store },
          { $pull: { products: product._id } }
        );

        return product;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    deleteStore: async (parent, { storeId }, context) => {
      if (context.user) {
        const store = await Store.findOneAndDelete({
          _id: storeId,
        });

        await User.findOneAndUpdate(
          { _id: store.user },
          { $pull: { stores: store._id } }
        );

        return store;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    updateStore: async (parent, { storeId }, context) => {
      if (context.user) {
        const store = await Store.findOneAndDelete({
          _id: storeId,
        });

        await User.findOneAndUpdate(
          { _id: store.user },
          { $pull: { stores: store._id } }
        );

        return store;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    updateProduct: async (parent, { productId }, context) => {
      if (context.user) {
        const product = await Product.findOneAndDelete({
          _id: productId,
        });

        await Store.findOneAndUpdate(
          { _id: product.store },
          { $pull: { products: product._id } }
        );

        return product;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;