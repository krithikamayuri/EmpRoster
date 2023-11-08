const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const Customer = sequelize.define('Customer', {
  custID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  custName: DataTypes.STRING,
  custAddr: DataTypes.STRING,
  custPhoneno: DataTypes.INTEGER,
  custEmail: DataTypes.STRING,
});

// Insert data into the User table
(async () => {
  await sequelize.sync();
  console.log('Customer model synced with database');

  const custData = [
    {
        custName: 'Hazel Productions',
        custAddr: '53 Prairie Lane',
        custPhoneno: 89097867,
        custEmail: 'hazelproductions@gmail.com'
    },
    {
        custName: 'Susan`s bakery',
        custAddr: '95 Mavon Street',
        custPhoneno: '98101029',
        custEmail: 'sbakery@gmail.com '
    },
    {
        custName: 'Encharted Celebrations',
        custAddr: 'West Garner Street 71',
        custPhoneno: 87906512,
        custEmail: 'enchanted@gmail.com'
    },
    {
        custName: 'VitalityLife Wellness',
        custAddr: 'Kirkland Avenue 5',
        custPhoneno: 93456234,
        custEmail: 'vitalitylife@gmail.com'
    },
    {
        custName: 'PrimePulse Investments',
        custAddr: 'Carpenter Court 50',
        custPhoneno: 91826345,
        custEmail: 'primeplus@gmail.com'
    },
  ];

  // Prevent creation of duplicate data
  for (const data of custData) {
    try {
      // Use findOrCreate method to check if a record with the same email already exists
      const [customer, created] = await Customer.findOrCreate({
        where: { custEmail: data.custEmail }, // Check for duplicates based on email
        defaults: data, // Create the record if it doesn't exist
      });

      if (created) {
        console.log('Custoemr created:', customer.toJSON());
      } else {
        console.log('Customer already exists:', customer.toJSON());
      }
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  }
})();

module.exports = Customer;