import React from 'react';
import './productCard.scss'

const ProductCard = ({ name, description, price, quantity, category, image }) => {
  return (
    <div className='container'>
         <div className="product-card">
      <img src={image} alt={name} />
      <div className='info'>
        <h2>{name}</h2>
        <p>{description}</p>
        <div className='flex'>
          <p>Price: {price}</p>
          <p>Quantity: {quantity}</p>
          <p>Category: {category}</p>
        </div>

      </div>
     
    </div>
    </div>
 
  );
};

export default ProductCard;
