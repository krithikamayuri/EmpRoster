const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'test',
  database: 'emproster',
});

const ShiftTiming = sequelize.define('ShiftTiming', {
  date: {
    type: DataTypes.DATEONLY,
    primaryKey: true,
  },
  startTime: DataTypes.TIME,
  endTime: DataTypes.TIME,
});

(async () => {
  await sequelize.sync();
  console.log('ShiftTiming model synced with the database');

  const shiftTimingData = [
    {
      date: '2023-10-14',
      startTime: '8:00:00',
      endTime: '16:00:00',
    },
    {
      date: '2023-10-15',
      startTime: '9:00:00',
      endTime: '17:00:00',
    },
    {
      date: '2023-10-16',
      startTime: '10:00:00',
      endTime: '18:00:00',
    },
    {
      date: '2023-10-17',
      startTime: '8:30:00',
      endTime: '16:30:00',
    },
    {
      date: '2023-10-18',
      startTime: '9:30:00',
      endTime: '17:30:00',
    },
    {
      date: '2023-10-19',
      startTime: '8:00:00',
      endTime: '16:00:00',
    },
    {
      date: '2023-10-20',
      startTime: '10:00:00',
      endTime: '18:00:00',
    },
  ];

  for (const data of shiftTimingData) {
    try {
      const [shiftTiming, created] = await ShiftTiming.findOrCreate({
        where: { date: data.date }, // Check for duplicates based on date
        defaults: data, // Create the record if it doesn't exist
      });

      if (created) {
        console.log('ShiftTiming created:', shiftTiming.toJSON());
      } else {
        console.log('ShiftTiming already exists:', shiftTiming.toJSON());
      }
    } catch (error) {
      console.error('Error creating ShiftTiming:', error);
    }
  }
})();

module.exports = ShiftTiming;
