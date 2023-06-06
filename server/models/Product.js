const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
  name: {
      type: String,
      required: true,
      unique: true,
      trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
},
category: {
  type: String,
  required: true,
  trim: true
},
price: {
  type: Number,
  required: true,
  trim: true
},
quantity: {
  type: Number,
  required: true,
  trim: true
},
image: {
  type: String,
  required: true,
  trim: true
},

}
);

const Product = model('Product', productSchema);

module.exports = Product;
