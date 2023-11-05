const express = require('express');
const cors = require('cors')
const { Sequelize } = require('sequelize');
const User = require('../src/entity/users');
const Manager = require('../src/entity/manager');
const Employee = require('../src/entity/employee');
const Admin = require('../src/entity/admin');
const Shift = require('../src/entity/shift');
const StaffRequired = require('../src/entity/staffRequired');
const moment = require('moment');
const ShiftTiming = require('../src/entity/shiftTiming');
const Availability = require('../src/entity/availability');
const LeaveRequest = require('../src/entity/leaveRequests');
const SwapRequest = require("../src/entity/swapRequests");
const ClockInOut = require("../src/entity/clockInOut");
const multer = require('multer')
const upload = multer({ dest: './uploads/' })
const fs = require("fs");
const path = require('path');
const CancelShiftRequest = require("../src/entity/shiftcancelrequests");

const app = express();
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

const { exec } = require('child_process');


app.use(cors())
app.use(express.json());

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'test',
    database: 'emproster'
});

app.post("/api/register-admins", async (req, res) => {
    const { emp_email, emp_type, emp_name, emp_phoneno, emp_psw, emp_address } = req.body;
    console.log(req.body);

    try {
        let registered = null;

        if (emp_type === 'admin') {
            registered = await Admin.findOne({
                where: {
                    adminEmail: emp_email
                }
            });
        } else {
            registered = await Manager.findOne({
                where: {
                    managerEmail: emp_email
                }
            });
        }

        if (registered !== null) {
            return res.json({
                status: false,
                msg: "This email is already registered"
            });
        }

        if (registered === null && emp_type === 'admin') {
            const newUser = Admin.build({
                adminName: emp_name,
                adminAddress: emp_address,
                adminPhoneNo: emp_phoneno,
                adminEmail: emp_email,
                adminPsw: emp_psw
            });
            const newadmin = User.build({
                userName: emp_name,
                userAddress: emp_address,
                userPhoneNo: emp_phoneno,
                userEmail: emp_email,
                userPsw: emp_psw,
                userTypes: emp_type
            });
            await newUser.save();
            await newadmin.save();
            return res.json({
                status: true,
                msg: `Admin is created successfully`
            });
        } else if (registered === null && emp_type === 'manager') {
            const newUser = Manager.build({
                managerName: emp_name,
                managerAddress: emp_address,
                managerPhoneNo: emp_phoneno,
                managerEmail: emp_email,
                managerPsw: emp_psw
            });
            const newManager = User.build({
                userName: emp_name,
                userAddress: emp_address,
                userPhoneNo: emp_phoneno,
                userEmail: emp_email,
                userPsw: emp_psw,
                userTypes: emp_type

            });
            await newManager.save();
            await newUser.save();
            return res.json({
                status: true,
                msg: `Manager is created successfully`
            });
        }
    } catch (error) {
        // Handle the error
        console.error(error);
        return res.status(500).json({
            status: false,
            msg: "An error occurred during registration"
        });
    }
});

app.post("/api/login", async (req, res) => {
    const { userEmail, userPsw } = req.body;

    try {
        const user = await User.findOne({
            where: {
                userEmail: userEmail,
                userPsw: userPsw
            }
        });

        // attach employee id as its needed various places
        let employee_id = null;
        if (user) {
            const employee = await Employee.findOne({
                where: {
                    emp_email: userEmail
                }
            })
            if (employee) {
                employee_id = employee.emp_id;
            }
        }


        if (user) {
            res.json({
                success: true,
                message: 'Login successful',
                userTypes: user.userTypes,
                userEmail: user.userEmail,
                employee_id: employee_id
            });
        } else {
            res.status(401).json({ success: false, message: 'Authentication failed' });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post("/api/managerName", async (req, res) => {

    const { userEmail } = req.body;
    try {
        const manager = await Manager.findOne({
            where: {
                managerEmail: userEmail,
            }
        });

        if (manager) {
            res.json({
                success: true,
                message: 'ok',
                managerName: manager.managerName,
            });
        } else {
            res.status(401).json({ success: false, message: 'Failed to get managers name' });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.post("/api/employeeName", async (req, res) => {

    const { userEmail } = req.body;
    try {
        const employee = await Employee.findOne({
            where: {
                emp_email: userEmail,
            }
        });

        if (employee) {
            res.json({
                success: true,
                message: 'ok',
                employeeName: employee.emp_name,
            });
        } else {
            res.status(401).json({ success: false, message: 'Failed to get employee name' });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.post("/api/adminName", async (req, res) => {

    const { userEmail } = req.body;
    try {
        const admin = await Admin.findOne({
            where: {
                adminEmail: userEmail,
            }
        });

        if (admin) {
            res.json({
                success: true,
                message: 'ok',
                adminName: admin.adminName,
            });
        } else {
            res.status(401).json({ success: false, message: 'Failed to get employee name' });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.get('/api/emp_names', async (req, res) => {
    try {
        const employees = await Employee.findAll({
            attributes: ['emp_name'],
        });

        if (employees.length > 0) {
            const employeeNames = employees.map(employee => employee.emp_name);
            res.json({
                success: true,
                message: 'Employee names retrieved successfully',
                empNames: employeeNames,
            });
        } else {
            res.status(404).json({ success: false, message: 'No employees found' });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/hoursWorked', async (req, res) => {
    try {
        const emp_name = req.query.Emp_Name;

        if (!emp_name) {
            return res.status(400).json({ error: 'Employee name is required.' });
        }

        const shifts = await Shift.findAll({
            attributes: ['shiftID', 'shiftDate', 'shiftStartTime', 'shiftEndTime'],
            where: {
                emp_name: emp_name,
            },
        });

        if (shifts.length > 0) {
            const shiftInfo = shifts.map((shift) => ({
                shift_id: shift.shiftID,
                shift_date: shift.shiftDate,
                shift_start: shift.shiftStartTime,
                shift_end: shift.shiftEndTime,
            }));

            res.json({
                success: true,
                message: 'Shift information retrieved successfully',
                shifts: shiftInfo,
            })
        } else {
            res.json({
                success: true,
                message: 'No shifts found for the employee',
                shifts: [],
            });
        }
    } catch (err) {
        console.error('Database query error: ' + err);
        res.status(500).json({ error: 'Database query error' });
    }
});

app.get('/api/shiftCancelRequests', async (req, res) => {
    try{
        const shiftCancelRequests = await CancelShiftRequest.findAll();
        if(shiftCancelRequests.length > 0){
            const requestInfo = shiftCancelRequests.map((request) => ({
                shift_empId: request.empId,
                shift_shiftId: request.shiftId,
                shift_message: request.message,
            }))
            res.json({
                success: true,
                message: 'Shift cancel request information retrieved successfully',
                shiftCancelRequests: requestInfo,
            })
        } else {
            res.json({
                success: true,
                message: 'No shift cancel requests found',
                shiftCancelRequests: [],
            });
        }
    } catch(err) {
        console.error('Database query error: ' + err);
        res.status(500).json({ error: 'Database query error' });
    }
});

app.post('/api/inputShift', async (req, res) => {
    try {
        // Extract the shift data from the request body
        const shiftData = req.body;

        // Iterate through the shiftData to insert assigned shifts
        for (const shiftKey in shiftData) {
            if (shiftData[shiftKey] === 1) {
                const [date, emp_id] = shiftKey.split(',');
                const shiftStartTime = shiftData[`${shiftKey}_start_time`];
                const shiftEndTime = shiftData[`${shiftKey}_end_time`];

                // Create a new shift record in the database
                const shift = await Shift.create({
                    emp_id: parseInt(emp_id),
                    shiftDate: new Date(date),
                    shiftStartTime: shiftStartTime,
                    shiftEndTime: shiftEndTime,
                });
                //console.log('Shift created:', shift.toJSON());
            }
        }

        res.status(200).json({ message: 'Shift data added successfully' });
    } catch (error) {
        console.error('Error creating shift:', error);
        res.status(500).json({ error: 'Failed to create shift' });
    }
});

app.get('/api/staffRequired', async (req, res) => {
    try {
        // Query the StaffRequired model to retrieve the data
        const staffRequiredData = await StaffRequired.findAll();

        // Transform the data into the desired format
        const staffRequired = {};
        staffRequiredData.forEach(record => {
            const formattedDate = moment(record.date).format('YYYY-MM-DD'); // Format the date as 'YYYY-MM-DD'
            staffRequired[formattedDate] = record.staffRequired;
        });

        res.json(staffRequired);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/datesOnly', async (req, res) => {
    try {
        // Query the StaffRequired model to retrieve the data
        const staffRequiredData = await StaffRequired.findAll();

        // Extract and format the dates
        const dates = staffRequiredData.map(record => {
            return moment(record.date).format('YYYY-MM-DD');
        });

        res.json(dates);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/employeeIds', async (req, res) => {
    try {
        const employeeIds = await Employee.findAll({ attributes: ['emp_id'] });

        // Extract employee IDs from the Sequelize result
        const ids = employeeIds.map((employee) => employee.emp_id);

        res.json(ids);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/shiftTimings', async (req, res) => {
    try {
        const shiftTimings = await ShiftTiming.findAll();

        // Create an object to store shift timings in the desired format
        const shiftTimingsFormatted = {};

        // Convert the Sequelize instances to the correct format
        shiftTimings.forEach((shiftTiming) => {
            const { date, startTime, endTime } = shiftTiming;
            shiftTimingsFormatted[date] = [startTime, endTime];
        });

        res.json(shiftTimingsFormatted);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/empType', async (req, res) => {
    try {
        // Retrieve employee data from the database
        const employees = await Employee.findAll();

        // Create an object to store employee types in the desired format
        const employeeType = [];

        // Convert the Sequelize instances to the correct format
        employees.forEach((record) => {
            const emp_id = record.emp_id;
            const emp_type = record.emp_type;
            employeeType.push({ emp_id: emp_id, emp_type: emp_type, status: 1 });
        });

        res.json(employeeType);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/availability', async (req, res) => {
    try {
        const availability = await Availability.findAll();

        const availabilityData = [];

        // Convert the Sequelize instances to the correct format
        availability.forEach((record) => {
            const emp_id = record.emp_id;
            const formattedDate = moment(record.date).format('YYYY-MM-DD');
            //availabilityData[[formattedDate, emp_id]] = 1;
            availabilityData.push({ date: formattedDate, employeeId: emp_id, available: 1 });
        });
        res.json(availabilityData);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/leave_requests', async (req, res) => {
    try {
        const leave_requests = await LeaveRequest.findAll({
            where: {
                status: 'approved',
            },
        });

        const leaveRequestData = [];

        // Convert the Sequelize instances to the correct format
        leave_requests.forEach((record) => {
            const emp_id = record.emp_id;
            const formattedDate = moment(record.date).format('YYYY-MM-DD');
            leaveRequestData.push({ date: formattedDate, employeeId: emp_id, available: 1 });
        });
        res.json(leaveRequestData);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// get all employees
app.get('/api/getemployees', async (req, res) => {
    try {
        // Retrieve employee data from the database
        const employees = await Employee.findAll({ attributes: ['emp_id', 'emp_name', 'emp_email'] });

        // // Create an object to store employee types in the desired format
        // const employeeType = {};

        // // Convert the Sequelize instances to the correct format
        // employees.forEach((employee) => {
        //   const emp_id = employee.emp_id;
        //   const emp_type = employee.emp_type;
        //   employeeType[[emp_id,emp_type]];
        // });

        res.json(employees);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// get all shifts of employee
app.get('/api/getemployeeshifts/:empId', async (req, res) => {
    try {
        // Retrieve employee data from the database
        const shifts = await Shift.findAll({
            where: {
                emp_id: req.params.empId,
            },
        });
        res.json(shifts);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// save shift swap request
app.post("/api/createShiftSwapRequest", async (req, res) => {
    try {
        console.log(req.body);
        const { requestedBy, requestedTo, message, status, date, shiftId } = req.body.data;
        console.log(typeof requestedBy)
        const sql = "INSERT INTO `swapRequests` (`requestedBy`,`requestedTo`,`shiftId`, `date`, `message`,`status`, `createdAt`, `updatedAt`) " +
            "VALUES (:requestedBy, :requestedTo, :shiftId, :date, :message, :status, NOW(), NOW() )";
        // Execute the raw SQL query
        const [results, metadata] = await sequelize.query(sql, {
            replacements: { requestedBy, requestedTo, shiftId, date, message, status }, // Bind parameters
            type: Sequelize.QueryTypes.INSERT
        })

        res.status(201).json({
            status: true,
            message: "Request sent successfully"
        });
    } catch (e) {
        console.log(e.message);
    }
});


// get all shifts of employee
app.get('/api/getAllSwapRequests/:empId', async (req, res) => {
    try {
        // Retrieve employee data from the database
        const shifts = await SwapRequest.findAll({
            where: {
                emp_id: req.body.empId,
            },
        });
        res.json(shifts);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get("/api/getEmployeeByEmail/:email", async (req, res) => {

    const { email } = req.params;
    //console.log(email)
    try {
        const employee = await Employee.findOne({
            where: {
                emp_email: email,
            }
        });

        if (employee) {
            res.json({
                success: true,
                message: 'ok',
                employee: employee,
            });
        } else {
            res.status(401).json({ success: false, message: 'Failed to get employee name' });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.post('/api/postavailable', async (req, res) => {
    try {
      // Extract data from the request body
      const { emp_id, date } = req.body;
  
   
      const availabilityRecords = [];
  
      // Create a new Availability record for each date
      date.forEach(async (date) => {
        const newAvailability = new Availability({
          emp_id: emp_id,
          date: date,
        });
  
        // Save the record to the database
        await newAvailability.save();
        availabilityRecords.push(newAvailability);
      });
  
      return res.json({
        status: true,
        availability: availabilityRecords,
      });
    } catch (error) {
      // Handle the error
      console.error(error);
      return res.status(500).json({
        status: false,
        msg: 'An error occurred while saving availability data',
      });
    }
  });
// Define a route to search for an employee by email
app.get('/api/employee/:email', async (req, res) => {
    const emp_email = req.params.email; // Get the email from the route parameter
  
    try {
      const employee = await Employee.findOne({
        where: { emp_email },
        attributes: ['emp_id','emp_name'],
      });
  
      if (employee) {
        res.json({ emp_id: employee.emp_id,emp_name:employee.emp_name });
      } else {
        res.status(404).json({ error: 'Employee not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching for the employee.' });
    }
  });

app.get('/api/employees/:emp_id', async (req, res) => {
    const emp_id = req.params.emp_id; // Get the emp_id from the route parameter

    try {
        const dates = await Availability.findAll({
            where: { emp_id },
            attributes: ['date'],
        });

        if (dates && dates.length > 0) {
            const dateList = dates.map((record) => {
                const date = record.date;
                return date.toISOString().split('T')[0]; // Extract and format the date
            });

            res.json({ dates: dateList });
        } else {
            res.status(404).json({ error: 'No dates found for the employee.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving dates for the employee.' });
    }
});

app.post('/api/runPy', (req, res) => {
    exec('python ../pyomo_scripts/employee_scheduling.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            res.json({ result: stdout }); // Send the script's output as a response
        }
    });
});

let msgData = {};

app.post('/api/send-messages', (req, res) => {
    try {
        const messages = req.body;
        msgData = messages;
        console.log('Received messages:', messages);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/*
app.get('/api/messages', (req, res) => {
    try {
        res.json(msgData);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}); */

app.get('/api/messages', (req, res) => {
    try {
        res.json(msgData);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// get swap shift requests
app.get("/api/getSwapShiftRequests/:employeeId", async (req, res) => {
    const employeeId = req.params.employeeId
    //await new Promise(resolve => setTimeout(resolve, 1000000));

    try {

        const sqlQuery1 = `SELECT swaprequests.*, employees.emp_name as requestedByName FROM swaprequests 
                INNER JOIN employees ON swaprequests.requestedBy = employees.emp_id 
                WHERE swaprequests.requestedTo = ${employeeId}`;

        const sqlQuery2 = `SELECT swaprequests.* FROM swaprequests 
                INNER JOIN employees ON swaprequests.requestedBy = employees.emp_id 
                WHERE swaprequests.requestedBy = ${employeeId}`;

        // swap shift requests received
        const requests_received = await sequelize.query(sqlQuery1, {
            type: Sequelize.QueryTypes.SELECT
        });

        // swap shift requests sent
        const requests_sent = await sequelize.query(sqlQuery2, {
            type: Sequelize.QueryTypes.SELECT
        });

        res.json({
            status: true,
            requests_sent: requests_sent,
            requests_received: requests_received
        });

    } catch (e) {
        console.error('An error occurred:', e.message);
        res.status(500).json({ message: 'Internal server error' });
    }
})


// update swape shift request
app.post("/api/updateSwapShiftRequest", async (req, res) => {
    try {
        console.log(req.body);
        const { swapReqId, status, shiftId, requestedTo, emp_name } = req.body;

        const sql = `UPDATE swaprequests SET status='${status}' WHERE swapReqId=${swapReqId}`;
        // Execute the raw SQL query
        await sequelize.query(sql, {
            type: Sequelize.QueryTypes.UPDATE
        });

        // if shift status changed to accepted then change swap shift ids
        if (status == 'accepted') {
            const sql2 = `UPDATE shifts SET emp_id=${requestedTo}, emp_name='${emp_name}' WHERE shiftID=${shiftId}`;
            // Execute the raw SQL query
            await sequelize.query(sql2, {
                type: Sequelize.QueryTypes.UPDATE
            });
        }


        res.status(201).json({
            status: true,
            message: `Request ${status}`
        });
    } catch (e) {
        console.log(e.message);
    }
});


app.post('/api/cancelShiftRequest', upload.single('file'), async (req, res) => {
    try {

        const { empId, shiftId, message, status } = req.body;
        let fileName = null; 
    
        if (req.file != null) {
          const ext = req.file.mimetype.split("/")[1];
          fileName = req.file.path + "." + ext;
          
          fs.rename(req.file.path, fileName, () => {
            console.log("File uploaded and renamed");
          });
        }



        const newCancelShiftRequest = await CancelShiftRequest.create({
            empId: empId,
            shiftId: shiftId,
            message: message,
            file: fileName,
            status: status || 'pending', // Set the default status if not provided
        });

        res.status(200).json({ status: true, data: newCancelShiftRequest, message: 'Cancel shift request added successfully' });
    } catch (error) {
        console.error('Error creating cancel shift request:', error);
        res.status(500).json({ status: false, error: 'Failed to create cancel shift request' });
    }
});

// Serve static files from the ./uploads directory
app.use('/uploads', express.static(__dirname + '/uploads'));

app.get('/api/getCancelShiftRequests', async (req, res) => {
    try {
      const cancelShiftRequests = await CancelShiftRequest.findAll();
      res.status(200).json({ status: true, data: cancelShiftRequests, message: 'Cancel shift requests retrieved successfully' });
    } catch (error) {
      console.error('Error fetching cancel shift requests:', error);
      res.status(500).json({ status: false, error: 'Failed to retrieve cancel shift requests' });
    }
});
 
app.post('/api/approveRequest/:id', async (req, res) => {
    const requestId = parseInt(req.params.id);
  
    try {
      const request = await CancelShiftRequest.findByPk(requestId);
  
      if (!request) {
        res.status(404).json({ status: false, message: 'Request not found' });
        return;
      }
  
      // Update the request status to 'accepted'
      request.status = 'accepted';
      await request.save();
      const shiftId = request.shiftId;
      const shift = await Shift.findByPk(shiftId);
  
      if (shift) {
        await shift.destroy(); // Delete the shift
      } else {
        console.log('Shift not found for the request');
      }
  
      res.json({ status: true, message: 'Request approved and shift deleted' });
    } catch (error) {
      console.error('Error approving request:', error);
      res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
});
  
  
  // API route to reject a request
app.post('/api/rejectRequest/:id', async (req, res) => {
    const requestId = parseInt(req.params.id);
  
    try {
      const request = await CancelShiftRequest.findByPk(requestId);
  
      if (!request) {
        res.status(404).json({ status: false, message: 'Request not found' });
      } else {
        request.status = 'rejected';
        await request.save(); // Save the updated status
        res.json({ status: true, message: 'Request rejected' });
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
});
  

app.get('/api/fetchShifts/:empId', async (req, res) => {
    const empId = req.params.empId;
    console.log(empId)
    const today = new Date();
    try {
        const shiftsByEmployee = await Shift.findAll({
            where: {
                emp_id: empId,
                shiftDate: {
                    [Sequelize.Op.gt]: today,
                  },
            },
        });
        if (shiftsByEmployee.length > 0) {
            res.status(200).json({ status: true, data: shiftsByEmployee });
        } else {
            res.status(200).json({ status: false, message: 'No shifts available for this employee' });
        }
    } catch (error) {
        console.error('Error fetching shifts:', error);
        res.status(500).json({ status: false, error: 'Failed to fetch shifts' });
    }
});

app.post('/api/clockinout', async (req, res) => {
    try {
      // Extract the shift data from the request body
      const { empId, date, clockIn, clockOut } = req.body;
  
      // Use the findOrCreate method to either create a new record or update an existing one
      const [shift, created] = await ClockInOut.findOrCreate({
        where: {
          empId: parseInt(empId),
          date: date,
        },
        defaults: {
          empId: parseInt(empId),
          date: date,
          clockIn: clockIn,
          clockOut: clockOut,
        },
      });
  
      if (!created) {
        // A record already exists for the same empId and date, so update the values
        shift.clockIn = clockIn;
        shift.clockOut = clockOut;
        await shift.save();
      }
  
      res.status(200).json({ status: true, data: shift, message: 'Data added successfully' });
    } catch (error) {
      console.error('Error creating/updating shift:', error);
      res.status(500).json({ error: 'Failed to create/update shift' });
    }
  });
  
  
  
  app.post('/api/updateClockOut', async (req, res) => {
    try {
      const { empId, date, clockOut } = req.body;
  
      const [updated] = await ClockInOut.update(
        { clockOut },
        {
          where: { empId, date },
        }
      );
  
      if (updated > 0) {
        res.status(200).json({ status: true, message: 'Clock out time and working hours updated successfully' });
      } else {
        res.status(404).json({ status: false, message: 'No matching record found to update' });
      }
    } catch (error) {
      console.error('Error updating clock out time:', error);
      res.status(500).json({ status: false, error: 'Failed to update clock out time' });
    }
  });
  
  
  app.get('/api/fetchClockInOut', async (req, res) => {
    try {
      const { empId, date } = req.query;
  
      const record = await ClockInOut.findOne({
        where: { empId, date },
        attributes: ['clockIn', 'clockOut'],
      });
  
      if (record) {
        res.status(200).json({ status: "true", data: record });
      } else {
        res.status(200).json({ status: false, message: 'No data available for this date and employee' });
      }
    } catch (error) {
      console.error('Error fetching clock in/out data:', error);
      res.status(500).json({ status: false, error: 'Failed to fetch clock in/out data' });
    }
  });



app.listen(5000, () => {
    console.log("Server started on port 5000")
})
