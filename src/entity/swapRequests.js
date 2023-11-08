const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 


const SwapRequest = sequelize.define('swapRequests', {
  swapReqId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  requestedBy: DataTypes.INTEGER,
  requestedTo: DataTypes.INTEGER,
  shiftId: DataTypes.INTEGER,
  message: DataTypes.TEXT,
  status: DataTypes.ENUM('pending', 'accepted', 'rejected'),
  date: DataTypes.DATEONLY,
});


const shiftTimingData = [
  {
    requestedBy: 1,
    requestedTo: 1,
    message: "test",
    date: '2023-10-14',
  }
];




(async () => {
  await sequelize.sync();
  console.log('ShiftTiming model synced with the database');
for (const data of shiftTimingData) {
  try {
    const [shiftTiming, created] = await SwapRequest.findOrCreate();

    if (created) {
      console.log('swapShift created:');
    } else {
      console.log('ShiftTiming already exists:');
    }
  } catch (error) {
    console.error('Error creating swap shift:', error);
  }
}
})();


module.exports = SwapRequest;
