import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';


import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Login from './pages/Login/index';
import Product from './pages/Product/productform'
import Sidebar from './pages/Sidebar/index';
import StoreForm from './pages/Store/storeform';
import Signup from './pages/Signup';

import ProductList from './pages/Website/productList';


import Logout from './pages/Logout';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});


// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


const App = () => {
  return (
    <ApolloProvider client={client}>
    <Router>
    <Sidebar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/addProduct" element={<Product />} />
        <Route path="/store" element={<StoreForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/yourWebsite" element={<ProductList />} />
        <Route path="/logout" element={<Logout />} />

      </Routes>
      </Router>

    </ApolloProvider>
  );
};

export default App;
