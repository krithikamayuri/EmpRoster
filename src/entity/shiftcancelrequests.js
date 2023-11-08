const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const ShiftCancelRequest = sequelize.define('shiftCancelRequest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  empId: DataTypes.INTEGER,
  empName: DataTypes.STRING,
  shiftId: DataTypes.INTEGER,
  message: DataTypes.TEXT,
  file: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending',
  }
});

(async () => {
  await sequelize.sync();
  console.log('ShiftCancelRequest model synced with the database');

  const shiftCancelRequestData = [
    {
      empId: 3,
      empName:"Gina",
      shiftId: 2,
      message: "test",
      file: "testfile.txt",
      status: "pending",
    },
    {
      empId: 1,
      empName:"John",
      shiftId: 3,
      message: "test2",
      file: "testfile2.txt",
      status: "pending",
    }
  ];

  for(const data of shiftCancelRequestData){
    try{
      const[shiftCancelRequest, created] = await ShiftCancelRequest.findOrCreate({
        where: {
          empId: data.empId,
          shiftId: data.shiftId,
        },
        defaults: data,
      });

      if(created) {
        console.log('ShiftCancelRequest created: ', shiftCancelRequest.toJSON());
      } else {
        console.log('ShiftCancelRequest already exists: ', shiftCancelRequest.toJSON());
      }
    } catch(error){
      console.log('Error creating shift cancel request: ', error);
    }
  }
})();




module.exports = ShiftCancelRequest;
