const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'test',
  database: 'emproster',
});

const ClockInOut = sequelize.define('ClockInOut', {
  clockId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  empId: DataTypes.INTEGER,
  clockIn: DataTypes.TIME,
  clockOut: DataTypes.TIME,
  date: DataTypes.DATEONLY,
});

(async () => {
  await sequelize.sync();
  console.log('ShiftTiming model synced with the database');

  const shiftTimingData = [
    {
      empId: 1,
      date: '2023-10-21',
      clockIn: '8:00:00',
      clockOut: '17:00:00',
    }
  ];

  for (const data of shiftTimingData) {
    try {
      const [shiftTiming, created] = await ClockInOut.findOrCreate({
        where: { date: data.date }, // Check for duplicates based on date
        defaults: data, // Create the record if it doesn't exist
      });

      if (created) {
        console.log('clockIn created:', ClockInOut.toJSON());
      } else {
        console.log('clockOut already exists:', ClockInOut.toJSON());
      }
    } catch (error) {
      console.error('Error creating ShiftTiming:', error);
    }
  }
})();

module.exports = ClockInOut;
