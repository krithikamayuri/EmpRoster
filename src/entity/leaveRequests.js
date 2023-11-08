const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const LeaveRequest = sequelize.define('LeaveRequest', {
  leaveRequestID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  emp_id: DataTypes.INTEGER,
  date: DataTypes.DATE,
  status: DataTypes.STRING,
});

(async () => {
  await sequelize.sync();
  console.log('LeaveRequest model synced with the database');

  const leaveRequestData = [
    { emp_id: 2, date: '2023-10-15', status: 'denied' },
    // Add more leave request data as needed
  ];

  for (const data of leaveRequestData) {
    try {
      // Use findOrCreate method to check if a record with the same emp_id and date already exists
      const [leaveRequest, created] = await LeaveRequest.findOrCreate({
        where: {
          emp_id: data.emp_id,
          date: data.date,
        },
        defaults: data, // Create the record if it doesn't exist
      });

      if (created) {
        console.log('LeaveRequest created:', leaveRequest.toJSON());
      } else {
        console.log('LeaveRequest already exists:', leaveRequest.toJSON());
      }
    } catch (error) {
      console.error('Error creating LeaveRequest:', error);
    }
  }
})();

module.exports = LeaveRequest;
