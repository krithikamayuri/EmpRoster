const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const Shift = sequelize.define('Shift', {
  shiftID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  emp_id: DataTypes.INTEGER,
  emp_name: DataTypes.STRING,
  shiftDate: DataTypes.DATEONLY,
  shiftStartTime: DataTypes.TIME,
  shiftEndTime: DataTypes.TIME,
  customerName: DataTypes.STRING,
  customerAddress: DataTypes.STRING
});

(async () => {
  await sequelize.sync();
  console.log('Shift model synced with the database');

  const shiftData = [
    {
      emp_id: 2,
      emp_name: 'Lucy',
      shiftDate: '2023-10-12', 
      shiftStartTime: '10:00:00',
      shiftEndTime: '18:00:00',
      customerName: 'Sarah',
      customerAddress: '123 Clementi Rd'
    },
    {
      emp_id: 3,
      emp_name: 'Gina',
      shiftDate: '2023-10-13',
      shiftStartTime: '12:00:00',
      shiftEndTime: '21:00:00',
      customerName: 'Shane',
      customerAddress: '45 orchard Rd'
    },
    {
      emp_id: 1,
      emp_name: 'John',
      shiftDate: '2023-11-01',
      shiftStartTime: '10:00:00',
      shiftEndTime: '19:00:00',
      customerName: 'Sarah',
      customerAddress: '30 Jurong street'
    }
  ];

  for (const data of shiftData) {
    try {
      // Use findOrCreate method to check if a record with the same emp_id and shiftDate already exists
      const [shift, created] = await Shift.findOrCreate({
        where: {
          emp_id: data.emp_id,
          shiftDate: data.shiftDate,
        },
        defaults: data, // Create the record if it doesn't exist
      });

      if (created) {
        console.log('Shift created:', shift.toJSON());
      } else {
        console.log('Shift already exists:', shift.toJSON());
      }
    } catch (error) {
      console.error('Error creating shift:', error);
    }
  }
})();

module.exports = Shift;
