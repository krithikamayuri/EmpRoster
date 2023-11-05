const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'test',
  database: 'emproster',
});

const shiftInformation = sequelize.define('shiftInformation', {
  date: {
    type: DataTypes.DATEONLY,
    primaryKey: true,
  }, 
  staffRequired: DataTypes.INTEGER,
  startTime: DataTypes.TIME,
  endTime: DataTypes.TIME,
});

(async () => {
  await sequelize.sync();
  console.log('shiftInformation model synced with the database');

  const shiftInformationData = [
    {
      date: '2023-10-14',
      staffRequired: 1,
      startTime: '8:00:00',
      endTime: '16:00:00',
    },
    {
      date: '2023-10-15',
      staffRequired: 2,
      startTime: '9:00:00',
      endTime: '17:00:00',
    },
    {
      date: '2023-10-16',
      staffRequired: 2,
      startTime: '10:00:00',
      endTime: '18:00:00',
    },
    {
      date: '2023-10-17',
      staffRequired: 2,
      startTime: '8:30:00',
      endTime: '16:30:00',
    },
    {
      date: '2023-10-18',
      staffRequired: 2,
      startTime: '9:30:00',
      endTime: '17:30:00',
    },
    {
      date: '2023-10-19',
      staffRequired: 2,
      startTime: '8:00:00',
      endTime: '16:00:00',
    },
    {
      date: '2023-10-20',
      staffRequired: 3,
      startTime: '10:00:00',
      endTime: '18:00:00',
    },
  ];

  for (const data of shiftInformationData) {
    try {
      const [shiftInfo, created] = await shiftInformation.findOrCreate({
        where: { date: data.date }, // Check for duplicates based on date
        defaults: data, // Create the record if it doesn't exist
      });

      if (created) {
        console.log('shiftInformation created:', shiftInfo.toJSON());
      } else {
        console.log('shiftInformation already exists:', shiftInfo.toJSON());
      }
    } catch (error) {
      console.error('Error creating shiftInformation:', error);
    }
  }
})();

module.exports = shiftInformation;
