import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import './productCard.scss';
import ProductCard from './productCard';

const ProductList = () => {
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false); // Flag to track form submission

  const { loading, error, data, refetch } = useQuery(QUERY_USER, {
    variables: { username },
    skip: !submitted, // Skip the initial query until the form is submitted
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data?.user;

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (username.trim() !== '') {
      setSubmitted(true); // Update the submitted flag
      refetch({ username });
    }
  };

  console.log(data); // Log the data object

  if (!user) {
    return (
      <div className="position">
        <p>User not found</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  const products = user.stores.flatMap((store) => store.products);

  return (
    <div className="header">
      <h1>Your Website</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
            quantity={product.quantity}
            category={product.category}
            image={product.image}
          />
        ))}
      </div>
      {/* Use storeInfo here */}
    </div>
  );
};

export default ProductList;
