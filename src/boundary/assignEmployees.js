import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import moment from 'moment';
import Report from './report';
import LatecomerReports from './LatecomerReports';
import ShiftCancel from './processShiftCancel';
import AddEmployee from './AddEmployee';
import ManagerDashboard from './managerDashboard';
import { assignEmployees } from '../controller/assignEmployeesController';
import { getMessages } from '../controller/getMessagesController';
import { runPython } from '../controller/runPythonController';

function AssignEmployees() {
  const defaultShiftData = {
    staffRequired: 0,
  };

  const [weekData, setWeekData] = useState(Array(7).fill(defaultShiftData));

  const [selectedWeek, setSelectedWeek] = useState(new Date());
  //const [weekData, setWeekData] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [messages, setMessages] = useState({});
  const [reportButtonPressed, setReportButtonPressed] = useState(false);
  const [shiftButtonPressed, setShiftButtonPressed] = useState(false);
  const [assignButtonPressed, setAssignButtonPressed] = useState(false);
  const [employeeButtonPressed, setEmployeeButtonPressed] = useState(false);
  const [lateButtonPressed, setLateButtonPressed] = useState(false);
  const [mgerButtonPressed, setMgerButtonPressed] = useState(false);
  const [errorMessages, setErrorMessages] = useState(Array(7).fill(''));

  const timeOptions = [];
  for (let hour = 8; hour < 19; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 18 && minute === 30) {
        break;
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
      console.log("Client-side weekData:", weekData);

      const updatedWeekData = weekData.map((data, index) => ({
        ...data,
        date: moment(daysInWeek[index]).format('YYYY-MM-DD'),
      }));

    if (updatedWeekData.length >= 7) {
      updatedWeekData[6] = {
        ...updatedWeekData[6],
        date: '2025-11-11',
      };
    }

      console.log("new one:", updatedWeekData);

      try {
        const responseData = await assignEmployees(updatedWeekData);

        if (responseData.message === 'Assignment successful') {
          setSuccessMessage('Shift information successfully added.');
          setErrorMessage('');
        } else {
          setSuccessMessage('');
          setErrorMessage('Shift information failed to add.');
          console.error('Shift information failed to add.');
        }
      } catch (error) {
        setSuccessMessage('');
        setErrorMessage('HTTP error! Status: ' + error);
        console.error('HTTP error! Status: ' + error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred. Please try again later.');
      setSuccessMessage('');
    }
  };

  const getMessagesFunction = async () => {
    try {
      const messages = await getMessages();
      if (messages.message === 'ok') {
        const data = messages.data;
        setMessages(data);
        console.log('Received messages from server:', data);
      } else {
        console.error("Failed to retrieve messages. Status code:", messages.status);
      }
    } catch (error) {
      console.error('An error occurred while getting messages:', error);
    }
  };

  const handlePythonScriptButtonClick = async () => {
    try {
      const scriptResult = await runPython();
      console.log(scriptResult.data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    getMessagesFunction();
  },);

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
    const updatedData = {
      ...data,
      date: moment(daysInWeek[index]).format('YYYY-MM-DD'),
    };

    // Check if start time and end time are the same
    if (updatedData.startTime !== null && updatedData.endTime !== null && updatedData.startTime === updatedData.endTime) {
      const errorMessage = (
        <>
          Start and end timings are the same for, {updatedData.date}.<br />
          The default (09:00 - 17:00) will be used if you do make adjustments.
        </>
      );

      setErrorMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages[index] = errorMessage;
        return newMessages;
      });
      return;
    }

    // Check if end time is later than start time
    if (updatedData.startTime !== null && updatedData.endTime !== null && updatedData.startTime > updatedData.endTime) {
      const errorMessage = (
        <>
          End time is earlier than start time for, {updatedData.date}.<br />
          The default (09:00 - 17:00) will be used if you do make adjustments.
        </>
      );
      setErrorMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages[index] = errorMessage;
        return newMessages;
      });
      return;
    }

    // Reset the error message for the current date
    setErrorMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      newMessages[index] = '';
      return newMessages;
    });

    updatedWeekData[index] = updatedData;
    setWeekData(updatedWeekData);
  };

  const daysInWeek = generateWeekDates(selectedWeek).filter(day => day.getDay() !== 0 && day.getDay() !== 6);

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
          <div className='mgernav topGreenHeader'>
            <h4 className=''>EverGreen Solutions - Manager Dashboard</h4>
          </div>
          <div className='manager_nav' style={{ background: 'linear-gradient(rgb(170, 139, 86), rgb(135, 100, 69))', padding: '10px', borderBottom: '2px solid black', color: "#fff", borderTop: '2px solid black' }}>
            <button onClick={handleReportButtonClick}>Working Hours Report</button>
            <button onClick={handleScriptButtonClick}>Assign Employees</button>
            <button onClick={handleShiftButtonClick}>Process Shift Cancellation Requests</button>
            <button onClick={handleEmployeeButtonClick}>Add Employees</button>
            <button onClick={handleLateButtonClick}>Clock In Reports</button>
            <button onClick={handleMgerButtonClick}>Go to home page</button>
          </div>
          <div>
            <h2 className='text-center my-2'>Assign Employees for a Week</h2>
            <div className='text-center'>
               <label>Select a Week: </label>
            <input
              type="date"
              className='form-control w-25 mx-auto mb-2'
              value={moment(selectedWeek).format('YYYY-MM-DD')}
              onChange={(e) => handleWeekChange(e.target.value)}
            />
            </div>
           
            <form onSubmit={handleSubmit}>
              {daysInWeek.map((day, index) => (
                <div key={day}>
                  <div className='row' style={{ backgroundColor: "#1c572124", margin: "10px 0", padding: "10px" }}>
                    <div className='col-md-6 my-2'>
                      <h5>{moment(day).format('DD-MM-YYYY')}</h5>
                      <label>Staff Required: </label>
                      <input
                        type="number"
                        className='form-control w-75'
                        value={weekData[index]?.staffRequired || ''}
                        onChange={(e) =>
                          handleDayDataChange(index, {
                            ...weekData[index],
                            staffRequired: e.target.value,
                            startTime: e.target.value > 0 ? '09:00' : null,
                            endTime: e.target.value > 0 ? '17:00' : null,
                          })
                        }
                      />
                    </div>
                    <div className='col-md-6'>
                      <h5>Timings</h5>
                      <div className='row'>
                        <div className='col-6'>
                          <label>Start Time: </label>
                          <select
                            value={weekData[index]?.startTime || '09:00'}
                            className='form-control w-50'
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
                        </div>
                        <div className='col-6'>
                          <label>End Time: </label>
                          <select
                            value={weekData[index]?.endTime || '17:00'}
                            className='form-control w-50'
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
                      </div>


                    </div>

                    <div>
                    <div>
                    <label>Customer Name: </label>
                          <input
                            type="text"
                            className='form-control w-50'
                            value={weekData[index]?.customerName || ''}
                            onChange={(e) =>
                              handleDayDataChange(index, {
                                ...weekData[index],
                                customerName: e.target.value,
                              })
                            }
                          />
                    </div>
                    <div>
                          <label>Customer Address: </label>
                          <input
                            type="text"
                            className='form-control w-50'
                            value={weekData[index]?.customerAddress || ''}
                            onChange={(e) =>
                              handleDayDataChange(index, {
                                ...weekData[index],
                                customerAddress: e.target.value,
                              })
                            }
                          />
                    </div>
                    </div>

                  </div>


                  {errorMessages[index] && <p className="error-message">{errorMessages[index]}</p>}
                </div>
              ))}
              <button type="submit" className='btn btn-success btn-sm'>Add shift data</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <br></br>
            <h5>Auto-assign Employees</h5>
            <button onClick={handlePythonScriptButtonClick} className='btn btn-success btn-sm mb-3'>Assign Employees</button>

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
  )
};

export default AssignEmployees;
