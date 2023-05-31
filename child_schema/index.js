const User = require("./models/Parent.model")
const City = require("./models/City.model")
const Address = require("./models/Child.model")
const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



const cityData = {
  name: 'Quito',
  country: 'Ecuador',
  population: 2520234
};

City.create(cityData)
  .then((city) => {
    // Create a sample user document
    const userData = {
      name: 'Morgan Washington',
      email: 'morgan@example.com',
      address: city._id
    };

    return User.create(userData);
  })
  .then((user) => {
    // Fetch user data with populated address field using aggregation and population
    return User.aggregate([
      {
        $match: { _id: user._id }
      },
      {
        $lookup: {
          from: 'cities',
          localField: 'address',
          foreignField: '_id',
          as: 'addressData'
        }
      }
    ]).exec();
  })
  .then((users) => {
    // Populate the address field with city data
    return User.populate(users, { path: 'address'});
  })
  .then((populatedUsers) => {
    console.log('Populated Users:', populatedUsers);
    console.log('Populated Users:');
    populatedUsers.forEach((user) => {
    console.log('Name:', user.name);
    console.log('Email:', user.email);
    console.log('Address:',user.addressData[0]);
    // console.log('Street:', user.addressData[0].street);
    // console.log('City:', user.addressData[0].city);
    // console.log('State:', user.addressData[0].state);
    // console.log('Country:', user.addressData[0].country);
    console.log('-----------------------');
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });

