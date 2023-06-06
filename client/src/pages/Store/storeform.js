import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_STORE, UPDATE_STORE, DELETE_STORE } from '../../utils/mutations';
import './Carousel.scss';

const StoreForm = ({ store, onUpdate, onDelete }) => {
  const questions = [
    { question: 'What is the store name?', key: 'storeName' },
    { question: 'Add color for your web theme?', key: 'colorBackground' },
    { question: 'Please provide your business phone number', key: 'phoneNumber' },
    { question: 'Please provide your business email', key: 'email' },
    { question: 'Please provide your business logo', key: 'storeLogo' },
  ];

  const initialValues = store
  ? {
      storeName: store.storeName || '',
      colorBackground: store.colorBackground || '',
      storeLogo: store.storeLogo || '',
      phoneNumber: parseFloat(store.phoneNumber) || '', // Parse as float
      email: store.email || '',
    }
  : {
      storeName: '',
      colorBackground: '',
      storeLogo: '',
      phoneNumber: '', // Initialize as an empty string
      email: '',
    };



  const [values, setValues] = useState(initialValues);

  const [createStore] = useMutation(CREATE_STORE);
  const [updateStore] = useMutation(UPDATE_STORE);
  const [deleteStore] = useMutation(DELETE_STORE);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAnswerChange = (key, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const { storeName, colorBackground, storeLogo, phoneNumber, email } = values;
  
    // Obtain the store ID or retrieve it from your application's state
    // /const  = ''; // Replace with the actual store ID
  
    if (store) {
      // Update product
      await updateStore({
        variables: {
          storeId: store.id,
          storeName,
          colorBackground,
          phoneNumber: parseFloat(phoneNumber),
          email,
          storeLogo,
        },
      });
      onUpdate();
    } else {
      // Create product
      await createStore({
        variables: {
          storeName,
          colorBackground,
          phoneNumber: parseFloat(phoneNumber),
          email,
          storeLogo,
        },
      });
      setValues(initialValues);
    }
  };
  
  

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this Store?')) {
      await deleteStore({
        variables: {
          storeId: store.id,
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

  const handlePrevQuestion = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <div className="store">
      <form onSubmit={handleFormSubmit}>
        {/* Form fields */}
        <button type="submit" className="primary-button">
          {store ? 'Update Store' : 'Create Store'}
        </button>
        {store && (
          <button className="danger-button" onClick={handleDelete}>
            Delete Store
          </button>
        )}
      </form>

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
              />
            </div>
          ))}
        </div>
        <button className="prev-button" onClick={handlePrevQuestion} disabled={currentIndex === 0}>
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
    </div>
  );
};

export default StoreForm;


