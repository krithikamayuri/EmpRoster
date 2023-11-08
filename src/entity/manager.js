const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const Manager = sequelize.define('Managers', {
  managerID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  managerName: DataTypes.STRING,
  managerAddress: DataTypes.STRING,
  managerPhoneNo: DataTypes.STRING(8), 
  managerEmail: DataTypes.STRING,
  managerPsw: DataTypes.STRING,
});

// Insert specific data into the Manager table
(async () => {
  await sequelize.sync();
  console.log('Manager model synced with database');

  const managerData = [
    {
      managerName: 'Tony',
      managerAddress: 'Clarke Quay Street 64',
      managerPhoneNo: '98123478',
      managerEmail: 'tony@gmail.com',
      managerPsw: 'tony_mger@7979',
    },
    {
      managerName: 'Alicia',
      managerAddress: 'Sunshine Road Street 97',
      managerPhoneNo: '87896745',
      managerEmail: 'alicia64@yahoo.com',
      managerPsw: 'a1ici@_mger4646',
    },
  ];

  // Prevent the creation of duplicate data
  for (const data of managerData) {
    try {
      // Use findOrCreate method to check if a record with the same email already exists
      const [manager, created] = await Manager.findOrCreate({
        where: { managerEmail: data.managerEmail }, // Check for duplicates based on email
        defaults: data, // Create the record if it doesn't exist
      });

      if (created) {
        console.log('Manager created:', manager.toJSON());
      } else {
        console.log('Manager already exists:', manager.toJSON());
      }
    } catch (error) {
      console.error('Error creating manager:', error);
    }
  }
})();

module.exports = Manager;
