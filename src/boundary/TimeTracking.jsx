import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';

function TimeTracking(props) {
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");
  const [clockInDisabled, setClockInDisabled] = useState(false);
  const [clockOutDisabled, setClockOutDisabled] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/employee/${props.userEmail}`)
      .then((response) => {
        console.log(response.data);
        setEmpId(response.data.emp_id);
        setEmpName(response.data.emp_name);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });

    axios
      .get(`/api/fetchClockInOut?empId=${empId}&date=${moment().format('MMMM D, YYYY')}`)
      .then(response => {
        console.log(response.data);
        if (response.data.status === "true") {
         
          setClockInTime(response.data.data.clockIn)
          if(response.data.data.clockOut != null){
            setClockOutTime(response.data.data.clockOut)
            setClockOutDisabled(true);
          }
      
          setClockInDisabled(true);
        
        }
      })
      .catch((error) => {
        console.error('Error fetching clock in/out data:', error);
      });
  }, [empId]);
console.log(clockInTime)
console.log(clockOutTime)
  // Function to handle clock-in button click
  const handleClockIn = () => {
    const clockInTimestamp = moment();
  
    // Make a POST request to record the clock-in time
    axios
      .post('/api/clockinout', {
        empId,
        date: moment().format('MMMM D, YYYY'),
        clockIn: clockInTimestamp.format('HH:mm:ss'), // Format as 24-hour time
      })
      .then((response) => {
        setClockInTime(clockInTimestamp.format('HH:mm'));
        setClockInDisabled(true);
      })
      .catch((error) => {
        console.error('Error recording clock in time:', error);
      });
  };
  

  // Function to handle clock-out button click
  const handleClockOut = () => {
    const clockOutTimestamp = moment();
  
    // Make a POST request to update the clock-out time
    axios
      .post('/api/updateClockOut', {
        empId,
        date: moment().format('MMMM D, YYYY'),
        clockOut: clockOutTimestamp.format('HH:mm:ss'), // Format as 24-hour time
      })
      .then((response) => {
        setClockOutTime(clockOutTimestamp.format('HH:mm'));
        setClockOutDisabled(true);
      })
      .catch((error) => {
        console.error('Error updating clock out time:', error);
      });
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
