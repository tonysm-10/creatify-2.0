import React, { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_PRODUCT, DELETE_PRODUCT } from '../../utils/mutations';
import './Carousel.scss';
import { QUERY_USER } from '../../utils/queries';

const ProductForm = ({ product, onUpdate, onDelete }) => {
  const questions = [
    { question: 'What is the product name?', key: 'name' },
    { question: 'What is the product description?', key: 'description' },
    { question: 'What is the product price?', key: 'price' },
    { question: 'What is the product quantity?', key: 'quantity' },
    { question: 'What is the product category?', key: 'category' },
    { question: 'What is the product image?', key: 'image' },
  ];

  const initialValues = product
    ? {
        name: product.name || '',
        description: product.description || '',
        price: parseFloat(product.price) || '',
        quantity: parseFloat(product.quantity) || '',
        category: product.category,
        image: product.image || '',
      }
    : {
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        image: '',
      };

  const [values, setValues] = useState(initialValues);

  const [createProduct] = useMutation(CREATE_PRODUCT, {
    onCompleted: (data) => {
      console.log(data); // Handle the response data
      setValues(initialValues); // Reset the form values after successful mutation
    },
    onError: (error) => {
      console.log(error); // Handle the error
    },
  });
  // const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [storeId, setStoreId] = useState('');
  const { loading, data } = useQuery(QUERY_USER);
  const stores = useMemo(() => data?.user?.stores || [], [data]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleAnswerChange = (key, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const { name, description, price, quantity, category, image } = values;
  
    await createProduct({
      variables: {
        name,
        description,
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        category,
        image,
        storeId: storeId,
      },
    });
  
    setValues(initialValues);
  };
  

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct({
        variables: {
          productId: product.id,
        },
      });
      onDelete();
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    }
  };

  const handleChange = (e) => {
    setStoreId(e.target.value);
  };

  const handlePrevQuestion = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product">
      <form onSubmit={handleFormSubmit}>
        {/* Form fields */}
        <button type="submit" className="primary-button">
          {product ? 'Update Product' : 'Create Product'}
        </button>
        {product && (
          <button className="danger-button" onClick={handleDelete}>
            Delete Product
          </button>
        )}

        <select
          onChange={handleChange}
          value={storeId}
          style={{
            position: 'absolute',
            left: '100px',
            bottom: '1rem',
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid blue',
          }}
        >
          {stores &&
            stores.map((store) => (
              <option key={store._id} value={store._id}>
                {store.storeName}
              </option>
            ))}
        </select>
        <div className="carousel" id="question-carousel">
          <div className="slides">
            {questions.map((question, index) => (
              <div
                className={`slide ${currentIndex === index ? 'active' : ''}`}
                key={index}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                <h3>{question.question}</h3>
                <input
                  type="text"
                  className="answer-input"
                  value={values[question.key]}
                  onChange={(e) => handleAnswerChange(question.key, e.target.value)}
                  required // Add the required attribute
                />
              </div>
            ))}
          </div>
          <button
            className="prev-button"
            onClick={handlePrevQuestion}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button
            className="next-button"
            onClick={handleNextQuestion}
            disabled={currentIndex === questions.length - 1}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
