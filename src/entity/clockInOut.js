const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 
const Shift = require('./shift');

const ClockInOut = sequelize.define('ClockInOut', {
  clockId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  empId: DataTypes.INTEGER,
  empName: DataTypes.STRING,
  shiftId: DataTypes.INTEGER,
  clockIn: DataTypes.TIME,
  clockOut: DataTypes.TIME,
  date: DataTypes.DATEONLY,
});

ClockInOut.belongsTo(Shift, { foreignKey: 'shiftId' });

(async () => {
  await sequelize.sync();
  console.log('ShiftTiming model synced with the database');

  const shiftTimingData = [
    {
      empId: 1,
      empName:'John',
      shiftId: 3,
      date: '2023-11-01',
      clockIn: '10:30:00',
      clockOut: '19:01:00',
    },
    {
      empId: 2,
      empName:'Lucy',
      shiftId: 1,
      date: '2023-10-12',
      clockIn: '09:57:00',
      clockOut: '18:03:00',
    }
  ];

  for (const data of shiftTimingData) {
    try {
      const [shiftTiming, created] = await ClockInOut.findOrCreate({
        where: { date: data.date },
        defaults: data,
      });
    
      if (created) {
        console.log('clockInOut created:', shiftTiming.toJSON());
      } else {
        console.log('clockInOut already exists:', shiftTiming.toJSON());
      }
    } catch (error) {
      console.error('Error creating ClockInOut:', error);
    }
    
  }
})();

module.exports = ClockInOut;
