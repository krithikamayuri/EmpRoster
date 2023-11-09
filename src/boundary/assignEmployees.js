import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Report from './report';
import LatecomerReports from './LatecomerReports';
import ShiftCancel from './processShiftCancel';
import AddEmployee from './AddEmployee';
import ManagerDashboard from './managerDashboard';
//import { assignEmployees } from '../controller/assignEmployeesController';

function AssignEmployees() {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [weekData, setWeekData] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [messages, setMessages] = useState({});
  const [reportButtonPressed, setReportButtonPressed] = useState(false);
  const [shiftButtonPressed, setShiftButtonPressed] = useState(false);
  const [assignButtonPressed, setAssignButtonPressed] = useState(false);
  const [employeeButtonPressed, setEmployeeButtonPressed] = useState(false);
  const [lateButtonPressed, setLateButtonPressed] = useState(false);
  const [mgerButtonPressed, setMgerButtonPressed] = useState(false);

  const timeOptions = [];
  for (let hour = 8; hour < 19; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 18 && minute === 30) {
        break; // Skip 16:30
      }
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  const handleWeekChange = (date) => {
    setSelectedWeek(date);
  };

  const handleReportButtonClick = () => {
    // Set the state to indicate that the button has been pressed
    setReportButtonPressed(true);
    setShiftButtonPressed(false);
  }


  const handleShiftButtonClick = () => {
    setShiftButtonPressed(true);
    setReportButtonPressed(false);
  }

  const handleScriptButtonClick = async () => {
    setShiftButtonPressed(false);
    setReportButtonPressed(false);
    setAssignButtonPressed(true);
  };

  const handleEmployeeButtonClick = async () => {
    setShiftButtonPressed(false);
    setReportButtonPressed(false);
    setAssignButtonPressed(false);
    setEmployeeButtonPressed(true);
  };

  const handleLateButtonClick = async () => {
    setShiftButtonPressed(false);
    setReportButtonPressed(false);
    setAssignButtonPressed(false);
    setEmployeeButtonPressed(false);
    setLateButtonPressed(true);
  }

  const handleMgerButtonClick = async () => {
    setShiftButtonPressed(false);
    setReportButtonPressed(false);
    setAssignButtonPressed(false);
    setEmployeeButtonPressed(false);
    setLateButtonPressed(false);
    setMgerButtonPressed(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const updatedWeekData = weekData.map((data, index) => ({
        ...data,
        date: moment(daysInWeek[index]).format('YYYY-MM-DD'),
      }));
      
      console.log ("new one:", updatedWeekData);

      const url = '/api/assign-employees';
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weekData:updatedWeekData }),
      };
  
      const response = await fetch(url, requestOptions);
  
      if (response.ok) {
        const responseData = await response.json();
  
        if (responseData.message === 'Assignment successful') {
          setSuccessMessage('Shift information successfully added.');
          setErrorMessage('');
        } else {
          setSuccessMessage('');
          setErrorMessage('Shift information failed to add.');
          console.error('Shift information failed to add.');
        }
      } else {
        setSuccessMessage('');
        setErrorMessage('HTTP error! Status: ' + response.status);
        console.error('HTTP error! Status: ' + response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred. Please try again later.');
      setSuccessMessage('');
    }
  };

  const getMessages = async () => {
    try {
      const response = await axios.get('/api/messages');
      if (response.status === 200) {
        const data = response.data;
        setMessages(data);
        console.log('Received messages from server:', data);
      } else {
        console.error("Failed to retrieve messages. Status code:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while retrieving messages:", error);
    }
  };

  const handlePythonScriptButtonClick = async () => {
    try {
      // Make a request to the server endpoint that runs the Python script
      const response = await axios.post('/api/runPy');
     
      // Handle the response from the server
      console.log(response.data);
      
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    getMessages();
  }, );

  const generateWeekDates = (startOfWeek) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      dates.push(day);
    }
    return dates;
  };

  const handleDayDataChange = (index, data) => {
    const updatedWeekData = [...weekData];
    updatedWeekData[index] = {
      ...data,
      date: moment(daysInWeek[index]).format('YYYY-MM-DD'),
    };
    setWeekData(updatedWeekData);
  };

  const daysInWeek = generateWeekDates(selectedWeek);

  return (
    <>
    {assignButtonPressed ? (
      <AssignEmployees />
    ) : reportButtonPressed ? ( 
    <Report />
    ) : shiftButtonPressed ? (
    <ShiftCancel />
    ) : employeeButtonPressed ? (
      <AddEmployee />
    ) : lateButtonPressed ? (
      <LatecomerReports /> 
    ) : mgerButtonPressed ? (
      <ManagerDashboard /> 
    ) : (
    <div>
      <div className='mgernav'>
        <h4>EverGreen Solutions - Manager Dashboard</h4>
        <button onClick={handleReportButtonClick}>Working Hours Report</button>
        <button onClick={handleScriptButtonClick}>Assign Employees</button>
        <button onClick={handleShiftButtonClick}>Process Shift Cancellation Requests</button>
        <button onClick={handleEmployeeButtonClick}>Add Employees</button>
        <button onClick={handleLateButtonClick}>Clock In Reports</button>
        <button onClick={handleMgerButtonClick}>Go to home page</button>
      </div>
    <div>
      <h2>Assign Employees for a Week</h2>
      <label>Select a Week: </label>
      <input
        type="date"
        value={moment(selectedWeek).format('YYYY-MM-DD')}
        onChange={(e) => handleWeekChange(e.target.value)}
      />
      <form onSubmit={handleSubmit}>
        {daysInWeek.map((day, index) => (
          <div key={day}>
            <h5>{moment(day).format('DD-MM-YYYY')}</h5>
            <label>Staff Required: </label>
            <input
              type="number"
              value={weekData[index]?.staffRequired || ''}
              onChange={(e) =>
                handleDayDataChange(index, {
                  ...weekData[index],
                  staffRequired: e.target.value,
                })
              }
            />
            <label>Start Time: </label>
            <select
              value={weekData[index]?.startTime || ''}
              onChange={(e) =>
                handleDayDataChange(index, {
                  ...weekData[index],
                  startTime: e.target.value,
                })
              }
            >
              {timeOptions.map((time, timeIndex) => (
                <option key={timeIndex} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <label>End Time: </label>
            <select
              value={weekData[index]?.endTime || ''}
              onChange={(e) =>
                handleDayDataChange(index, {
                  ...weekData[index],
                  endTime: e.target.value,
                })
              }
            >
              {timeOptions.map((time, timeIndex) => (
                <option key={timeIndex} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button type="submit">Add shift data</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <br></br>
      <h5>Auto-assign Employees</h5>
      <button onClick={handlePythonScriptButtonClick}>Assign Employees</button>

{messages.message && (
  <pre>
    {messages.message
      .split("Not enough staff available")
      .map((line, index) => (
        <div key={index}>
          {index === 0 ? (
            <p>{line}</p>
          ) : line.trim() !== "" ? (
            <p>{"Not enough staff available" + line}</p>
          ) : (
            <br />
          )}
        </div>
      ))}
  </pre>
)}


        </div>
        </div>
    )}
        </>
)};

export default AssignEmployees;
