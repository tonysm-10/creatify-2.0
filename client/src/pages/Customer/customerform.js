import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER } from '../../mutations';

const CustomerForm = ({ customer, onEdit, onDelete }) => {
  const [name, setName] = useState(customer ? customer.name : '');
  const [email, setEmail] = useState(customer ? customer.email : '');
  const [phone, setPhone] = useState(customer ? customer.phone : '');

  const [createCustomer] = useMutation(CREATE_CUSTOMER);
  const [updateCustomer] = useMutation(UPDATE_CUSTOMER);
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (customer) {
      // Update customer
      await updateCustomer({
        variables: {
          customerId: customer.id,
          name,
          email,
          phone,
        },
      });
      onEdit();
    } else {
      // Create customer
      await createCustomer({
        variables: {
          name,
          email,
          phone,
        },
      });
      setName('');
      setEmail('');
      setPhone('');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      await deleteCustomer({
        variables: {
          customerId: customer.id,
        },
      });
      onDelete();
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">{customer ? 'Update Customer' : 'Create Customer'}</button>
        {customer && (
          <button type="button" onClick={handleDelete}>
            Delete Customer
          </button>
        )}
      </form>
    </div>
  );
};

export default CustomerForm;