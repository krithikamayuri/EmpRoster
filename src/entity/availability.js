const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const Availability = sequelize.define('Availability', {
  availabilityID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  emp_id: DataTypes.INTEGER,
  date: DataTypes.DATEONLY,
});

(async () => {
  await sequelize.sync();
  console.log('Availability model synced with the database');

  const availabilityData = [
    { emp_id: 1, date: '2023-10-14' },
    { emp_id: 1, date: '2023-10-15' },
    { emp_id: 1, date: '2023-10-16' },
    { emp_id: 1, date: '2023-10-17' },
    { emp_id: 1, date: '2023-10-18' },
    { emp_id: 1, date: '2023-10-19' },
    { emp_id: 1, date: '2023-10-20' },
    { emp_id: 2, date: '2023-10-14' },
    { emp_id: 2, date: '2023-10-16' },
    { emp_id: 2, date: '2023-10-17' },
    { emp_id: 2, date: '2023-10-18' },
    { emp_id: 2, date: '2023-10-19' },
    { emp_id: 2, date: '2023-10-20' },
    { emp_id: 3, date: '2023-10-14' },
    { emp_id: 3, date: '2023-10-15' },
    { emp_id: 3, date: '2023-10-16' },
    { emp_id: 3, date: '2023-10-17' },
    //{ emp_id: 3, date: '2023-10-18' },
    //{ emp_id: 3, date: '2023-10-19' },
    { emp_id: 3, date: '2023-10-20' },
  ];

  for (const data of availabilityData) {
    try {
      // Use findOrCreate method to check if a record with the same emp_id and date already exists
      const [availability, created] = await Availability.findOrCreate({
        where: {
          emp_id: data.emp_id,
          date: data.date,
        },
        defaults: data, // Create the record if it doesn't exist
      });

      if (created) {
        console.log('Availability created:', availability.toJSON());
      } else {
        console.log('Availability already exists:', availability.toJSON());
      }
    } catch (error) {
      console.error('Error creating availability:', error);
    }
  }
})();

module.exports = Availability;
