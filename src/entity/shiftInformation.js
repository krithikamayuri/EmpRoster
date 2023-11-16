const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const shiftInformation = sequelize.define('shiftInformation', {
  date: {
    type: DataTypes.DATEONLY,
    primaryKey: true,
  }, 
  staffRequired: DataTypes.INTEGER,
  startTime: DataTypes.TIME,
  endTime: DataTypes.TIME,
  customerName: DataTypes.STRING,
  customerAddress: DataTypes.STRING
});

(async () => {
  await sequelize.sync();
  console.log('shiftInformation model synced with the database');

  const shiftInformationData = [
    {
      date: '2023-08-19',
      staffRequired: 1,
      startTime: '8:00:00',
      endTime: '16:00:00',
    }
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
