const mongoose = require('mongoose');
const db = require('../config/connection');
const Product = require('../models/Product');
const Store = require('../models/Store');
const User = require('../models/User');
const productSeeds = require('./productSeeds.json');
const storeSeeds = require('./storeSeeds.json');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  try {
    await Product.deleteMany({});
    await Store.deleteMany({});
    await User.deleteMany({});

   const userid = []
   const storeid = []
   

   for(var i =0; i < userSeeds.length; i++){
    const {_id}=await User.create(userSeeds[i]);
    userid.push(_id)
   }

   for(var i =0; i < storeSeeds.length; i++){
    const {_id}=await Store.create(storeSeeds[i]);
    storeid.push(_id)
    await User.findOneAndUpdate(
      {
        _id:userid[Math.floor(Math.random () * userid.length )]

      },{
        $addToSet:{
          stores:_id
        }
      }
    )
   }
   
   for(var i =0; i < productSeeds.length; i++){
    const {_id}=await Product.create(productSeeds[i]);
 
     await Store.findOneAndUpdate(
      {
        _id:storeid[Math.floor(Math.random () * storeid.length )]

      },{
        $addToSet:{
          products:_id
        }
      }
    )
   }


  

    console.log('All done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});