/*
import React, { useEffect, useState } from 'react';
import { assignEmployees } from '../controller/assignEmployeesController';
import axios from 'axios';
const moment = require('moment');

function AssignEmployees() {
    const [selectedDate, setSelectedDate] = useState(null);
  const [staffRequired, setStaffRequired] = useState(0);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('16:00');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [messages, setMessages] = useState({});

  // Create an array of time options with 15-minute increments
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }

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
      
      // Get messages after running python script
      //
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    getMessages();
  }, );

  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [weekData, setWeekData] = useState([]);

  const handleWeekChange = (date) => {
    setSelectedWeek(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        // Call the assignEmployees function from the controller
        const date = moment(selectedDate).format('YYYY-MM-DD');
        const response = await assignEmployees(date, staffRequired, startTime, endTime);
  
        if (response && response.message === 'Assignment successful') {
          setSuccessMessage('Shift information successfully added.');
          setErrorMessage('');
        } else {
          setSuccessMessage('');
          setErrorMessage('Shift information failed to add.');
          console.error('Shift information failed to add.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setErrorMessage('An error occurred. Please try again later.');
        setSuccessMessage('');
      }
  };

  // Function to generate dates for a selected week
  const generateWeekDates = (startOfWeek) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      dates.push(day);
    }
    return dates;
  };

  // Function to update weekData
  const handleDayDataChange = (index, data) => {
    const updatedWeekData = [...weekData];
    updatedWeekData[index] = data;
    setWeekData(updatedWeekData);
  };

  const daysInWeek = generateWeekDates(selectedWeek);

  return (
    <div>
      <h2>Assign Employees for a Week</h2>
      <label>Select a Week: </label>
      <input type="date" value={selectedWeek} onChange={(e) => handleWeekChange(e.target.value)} />
      <form onSubmit={handleSubmit}>
        {daysInWeek.map((day, index) => (
          <div key={day}>
            <h5>{day.toDateString()}</h5>
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

      <button onClick={handlePythonScriptButtonClick}>Assign Employees</button>
      <div>
            {messages.unsuccessfulMsg && <p>{messages.unsuccessfulMsg}</p>}
            {messages.staffShortage && <p>{messages.staffShortage}</p>}
            {messages.staffShortage1 && <p>{messages.staffShortage1}</p>}
            {messages.person && <p>{messages.person}</p>}
            {messages.noLeave && <p>{messages.noLeave}</p>}
            {messages.success && <p>{messages.success}</p>}
            </div>

            {messages.message && (
            <pre>{messages.message}</pre>
    )}
    </div>
  );
}

export default AssignEmployees;
*/







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
//import { assignEmployees } from '../controller/assignEmployeesController';

function AssignEmployees() {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [weekData, setWeekData] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [messages, setMessages] = useState({});

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  const handleWeekChange = (date) => {
    setSelectedWeek(date);
  };
/*
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const weekDataToSend = daysInWeek.map((day, index) => ({
        date: moment(day).format('YYYY-MM-DD'),
        staffRequired: weekData[index]?.staffRequired,
        startTime: weekData[index]?.startTime,
        endTime: weekData[index]?.endTime,
      }));
      
      /*
      const weekDataToSend = weekData.map((data, index) => ({
        date: data.date,
        staffRequired: data.staffRequired,
        startTime: data.startTime,
        endTime: data.endTime,
      })); *//*
      console.log("Client-side weekData:", weekDataToSend);
      const response = await assignEmployees ({ weekData: weekDataToSend });

      if (response && response.message === 'Assignment successful') {
        setSuccessMessage('Shift information successfully added.');
        setErrorMessage('');
      } else {
        setSuccessMessage('');
        setErrorMessage('Shift information failed to add.');
        console.error('Shift information failed to add.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred. Please try again later.');
      setSuccessMessage('');
    }
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Client-side weekData:", weekData);
  
      const url = '/api/assign-employees';
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weekData }),
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
      
      // Get messages after running python script
      //
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
      <div>
            {messages.unsuccessfulMsg && <p>{messages.unsuccessfulMsg}</p>}
            {messages.staffShortage && <p>{messages.staffShortage}</p>}
            {messages.staffShortage1 && <p>{messages.staffShortage1}</p>}
            {messages.person && <p>{messages.person}</p>}
            {messages.noLeave && <p>{messages.noLeave}</p>}
            {messages.success && <p>{messages.success}</p>}
            </div>

            {messages.message && (
            <pre>{messages.message}</pre>
    )}
        </div>
  );    
}

export default AssignEmployees;
