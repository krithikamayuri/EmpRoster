const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 


const Admin = sequelize.define('Admin', {
  adminID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  adminName: DataTypes.STRING,
  adminAddress: DataTypes.STRING,
  adminPhoneNo: DataTypes.STRING(8), 
  adminEmail: DataTypes.STRING,
  adminPsw: DataTypes.STRING,
});

// Insert specific data into the Admin table
(async () => {
  await sequelize.sync();
  console.log('Admin model synced with database');

  const adminData = [
    {
      adminName: 'Susan Lee',
      adminAddress: '101 Clarke Quay',
      adminPhoneNo: '84562537',
      adminEmail: 'susan.lee@gmail.com',
      adminPsw: 'secret234',
    },
    {
      adminName: 'Michael Brown',
      adminAddress: '202 Sentosa Cove',
      adminPhoneNo: '90472675',
      adminEmail: 'michael@gmail.com',
      adminPsw: 'secure54',
    },
  ];

  // Prevent the creation of duplicate data
  for (const data of adminData) {
    try {
      // Use findOrCreate method to check if a record with the same email already exists
      const [admin, created] = await Admin.findOrCreate({
        where: { adminEmail: data.adminEmail }, // Check for duplicates based on email
        defaults: data, // Create the record if it doesn't exist
      });

      if (created) {
        console.log('Admin created:', admin.toJSON());
      } else {
        console.log('Admin already exists:', admin.toJSON());
      }
    } catch (error) {
      console.error('Error creating admin:', error);
    }
  }
})();

module.exports = Admin;