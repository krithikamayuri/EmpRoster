const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const Employee = sequelize.define('Employee', {
  emp_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  emp_name: DataTypes.STRING,
  emp_address: DataTypes.STRING,
  emp_phoneno: DataTypes.INTEGER,
  emp_emergency_contact: DataTypes.STRING,
  emp_email: DataTypes.STRING,
  emp_psw: DataTypes.STRING,
  emp_type: DataTypes.STRING,
});

// Insert data into the Employee table
(async () => {
  await sequelize.sync();
  console.log('Employee model synced with database');

  const employeeData = [
    {
      emp_name: 'John',
      emp_address: '123 Apple Street',
      emp_phoneno: 90875643,
      emp_emergency_contact: '89897656',
      emp_email: 'john@gmail.com',
      emp_psw: 'john_123',
      emp_type: 'partTime',
    },
    {
      emp_name: 'Lucy',
      emp_address: '456 Main Street',
      emp_phoneno: 87694503,
      emp_emergency_contact: '90237845',
      emp_email: 'lucy@hotmail.com',
      emp_psw: 'EmpLucy@001',
      emp_type: 'fullTime',
    },
    {
      emp_name: 'Gina',
      emp_address: 'Broadway Street 21',
      emp_phoneno: 87665139,
      emp_emergency_contact: '98067549',
      emp_email: 'gina006@yahoo.com',
      emp_psw: 'Gin@_e06',
      emp_type: 'fullTime',
    },
  ];
/*
    {
      emp_name: 'Tom',
      emp_address: '34 Highway Street',
      emp_phoneno: 89738962,
      emp_emergency_contact: '90126784',
      emp_email: 'tom@gmail.com',
      emp_psw: 'tom001_smith',
    },
    {
      emp_name: 'Brandon',
      emp_address: '560 Hamilton Way',
      emp_phoneno: 87654930,
      emp_emergency_contact: '89076754',
      emp_email: 'brandon@hotmail.com',
      emp_psw: 'Bran_Don15',
    },
    {
      emp_name: 'David',
      emp_address: '46 Hampshire Street',
      emp_phoneno: 91234687,
      emp_emergency_contact: '96758123',
      emp_email: 'david@yahoo.com',
      emp_psw: 'd@v1d_1976',
    },
    {
      emp_name: 'Christina',
      emp_address: 'Shenton Way 54',
      emp_phoneno: 96574023,
      emp_emergency_contact: '92783465',
      emp_email: 'christina004@gmail.com',
      emp_psw: 'christina_2121',
    },
    {
      emp_name: 'Stephanie',
      emp_address: 'Yishun Way 88',
      emp_phoneno: 97860043,
      emp_emergency_contact: '99887605',
      emp_email: 'steph012@gmail.com',
      emp_psw: 'steph@_0101',
    },
    {
      emp_name: 'Allister',
      emp_address: 'Boon Lay Drive',
      emp_phoneno: 97786547,
      emp_emergency_contact: '80996745',
      emp_email: 'allister@hotmail.com',
      emp_psw: '@llister_2001',
    },
    {
      emp_name: 'Gillian',
      emp_address: 'Gazelle Street 26',
      emp_phoneno: 90887654,
      emp_emergency_contact: '80997653',
      emp_email: 'gillian001@yahoo.com',
      emp_psw: 'gillian_!@02',
    },
  ];*/

// Prevent creation of duplicate data
for (const data of employeeData) {
  try {
    // Use findOrCreate method to check if a record with the same email already exists
    const [employee, created] = await Employee.findOrCreate({
      where: { emp_email: data.emp_email }, // Check for duplicates based on email
      defaults: data, // Create the record if it doesn't exist
    });

    if (created) {
      console.log('Employee created:', employee.toJSON());
    } else {
      console.log('Employee already exists:', employee.toJSON());
    }
  } catch (error) {
    console.error('Error creating employee:', error);
  }
}
})();

module.exports = Employee;
