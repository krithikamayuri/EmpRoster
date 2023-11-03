const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'test',
  database: 'emproster',
});

const StaffRequired = sequelize.define('StaffRequired', {
  date: {
    type: DataTypes.DATEONLY,
    primaryKey: true,
  },
  staffRequired: DataTypes.INTEGER,
});

// Insert data into the StaffRequired table
(async () => {
  await sequelize.sync();
  console.log('StaffRequired model synced with database');

  const staffRequiredData = [
    {
      date: '2023-10-14',
      staffRequired: 1,
    },
    {
      date: '2023-10-15',
      staffRequired: 2,
    },
    {
      date: '2023-10-16',
      staffRequired: 2,
    },
    {
      date: '2023-10-17',
      staffRequired: 2,
    },
    {
      date: '2023-10-18',
      staffRequired: 2,
    },
    {
      date: '2023-10-19',
      staffRequired: 2,
    },
    {
      date: '2023-10-20',
      staffRequired: 3,
    },
  ];

  for (const data of staffRequiredData) {
    try {
      const [staffRequired, created] = await StaffRequired.findOrCreate({
        where: { date: data.date }, // Check for duplicates based on date
        defaults: data, // Create the record if it doesn't exist
      });

      if (created) {
        console.log('StaffRequired created:', staffRequired.toJSON());
      } else {
        console.log('StaffRequired already exists:', staffRequired.toJSON());
      }
    } catch (error) {
      console.error('Error creating StaffRequired:', error);
    }
  }
})();

module.exports = StaffRequired;
