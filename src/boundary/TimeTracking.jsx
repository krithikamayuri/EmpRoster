import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getEmployeeData, getClockInOutData, recordClockIn, updateClockOut } from '../controller/TimeTrackingController';

function TimeTracking(props) {
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");
  const [clockInDisabled, setClockInDisabled] = useState(false);
  const [clockOutDisabled, setClockOutDisabled] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const employeeData = await getEmployeeData(props.userEmail);
        setEmpId(employeeData.emp_id);
        setEmpName(employeeData.emp_name);

        const clockInOutData = await getClockInOutData(empId, moment().format('MMMM D, YYYY'));
        console.log(clockInOutData);
        if (clockInOutData.status === "true") {
          setClockInTime(clockInOutData.data.clockIn);
          if (clockInOutData.data.clockOut !== null) {
            setClockOutTime(clockInOutData.data.clockOut);
            setClockOutDisabled(true);
          }
          setClockInDisabled(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [empId]);
console.log(clockInTime)
console.log(clockOutTime)
  // Function to handle clock-in button click
  const handleClockIn = async () => {
    const clockInTimestamp = moment();
    try {
      const response = await recordClockIn(empId, moment().format('MMMM D, YYYY'), clockInTimestamp.format('HH:mm:ss'));
      setClockInTime(clockInTimestamp.format('HH:mm'));
      setClockInDisabled(true);
      console.log(response);
    } catch (error) {
      console.error('Error recording clock in time:', error);
    }
  };
  

  const handleClockOut = async () => {
    const clockOutTimestamp = moment();
    try {
      const response = await updateClockOut(empId, moment().format('MMMM D, YYYY'), clockOutTimestamp.format('HH:mm:ss'));
      setClockOutTime(clockOutTimestamp.format('HH:mm'));
      setClockOutDisabled(true);
      console.log(response);
    } catch (error) {
      console.error('Error updating clock out time:', error);
    }
  };

  const handleGoBack = () => {
    window.history.back(); // This will take the user back to the previous page
  };
  

  return (
    <div>
    <div className="container mt-5">
      <div className="card" style = {{border: '1px solid black'}}>
        <div className="card-header text-white" style ={{background: 'linear-gradient(to bottom, green, #395144'}}>
          <h1>Employee Time Tracking</h1>

        </div>
        <div className="card-body">
          <div className="row">
            <h5 className="card-title col-md-6">
              Employee Name: {empName} {props.userName}
            </h5>
            <p className="card-text col-md-6 text-end">
              <strong>Date: {moment().format('MMMM D, YYYY')}</strong>
            </p>
          </div>
          <div className="row">
            <p className="card-text float-start col-md-6">
              Clock-In Time: {clockInTime ? clockInTime: '00:00:00'}
            </p>
            <p className="card-text float-end col-md-6 text-end">
              Clock-Out Time: {clockOutTime ? clockOutTime: '00:00:00'}
            </p>
          </div>
        </div>
        <div className="card-footer row">
          <div className="col-md-6">
          <button
            className="btn btn-success"
            onClick={handleClockIn}
            disabled={clockInDisabled}
              >
                {clockInDisabled
                  ? `Clocked In: ${clockInTime}`
                  : 'Clock In'}
              </button>

                    </div>
                    <div className="col-md-6 text-end">
                    <button
            className="btn btn-danger"
            onClick={handleClockOut}
            disabled={clockOutDisabled}
          >
            {clockOutDisabled
              ? `Clocked Out: ${clockOutTime}`
              : 'Clock Out'}
          </button>
          </div>
        </div>
      </div>
    </div>
    <button onClick={handleGoBack} className='btn btn-outline-dark m-4'><i class="ri-arrow-left-line" ></i>Previous page</button>
    </div>
  );
}

export default TimeTracking;
