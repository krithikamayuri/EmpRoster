const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'test',
  database: 'emproster',
});




const ShiftCancelRequest = sequelize.define('shiftCancelRequest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  empId: DataTypes.INTEGER,
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


/*const shiftTimingData = [
  {
    requestedBy: 1,
    requestedTo: 1,
    message: "test",
    date: '2023-10-14',
  }
];*/

/*(async () => {
  await sequelize.sync();
  console.log('ShiftTiming model synced with the database');
for (const data of shiftTimingData) {
  try {
    const [shiftTiming, created] = await shiftCancelRequest.findOrCreate();

    if (created) {
      console.log('swapShift created:');
    } else {
      console.log('ShiftTiming already exists:');
    }
  } catch (error) {
    console.error('Error creating swap shift:', error);
  }
}
})();*/
(async () => {
  await sequelize.sync();
  console.log('ShiftCancelRequest model synced with the database');

  const shiftCancelRequestData = [
    {
      empId: 3,
      shiftId: 2,
      message: "test",
      file: "testfile.pdf",
      status: "pending",
    },
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
