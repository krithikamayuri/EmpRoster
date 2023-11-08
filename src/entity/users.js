const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const User = sequelize.define('Users', {
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userTypes: DataTypes.STRING,
  userEmail: DataTypes.STRING,
  userPsw: DataTypes.STRING,
});

// Insert data into the User table
(async () => {
  await sequelize.sync();
  console.log('User model synced with database');

  const userData = [
    {
      userTypes: 'employee',
      userEmail: 'john@gmail.com',
      userPsw: 'john_123',
    },
    {
      userTypes: 'employee',
      userEmail: 'lucy@hotmail.com',
      userPsw: 'EmpLucy@001',
    },
    {
      userTypes: 'employee',
      userEmail: 'gina006@yahoo.com',
      userPsw: 'Gin@_e06',
    },
    {
      userTypes: 'manager',
      userEmail: 'tony@gmail.com',
      userPsw: '123',
    },
    {
      userTypes: 'manager',
      userEmail: 'alicia64@yahoo.com',
      userPsw: 'a1ici@_mger4646',
    },
    {
      userTypes: 'admin',
      userEmail: 'michael@gmail.com',
      userPsw: 'secure54',
    },
    {
      userTypes: 'admin',
      userEmail: 'susan.lee@gmail.com',
      userPsw: 'secret234',
    },
    {
      userTypes: 'superAdmin',
      userEmail: 'superAdmin@emproster.com',
      userPsw: '123456',
    }
  ];

  // Prevent creation of duplicate data
  for (const data of userData) {
    try {
      // Use findOrCreate method to check if a record with the same email already exists
      const [user, created] = await User.findOrCreate({
        where: { userEmail: data.userEmail }, // Check for duplicates based on email
        defaults: data, // Create the record if it doesn't exist
      });

      if (created) {
        console.log('User created:', user.toJSON());
      } else {
        console.log('User already exists:', user.toJSON());
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }
})();

module.exports = User;
