import React from 'react';
import Report from './report';
import AssignEmployees from './assignEmployees';
import AddEmployee from './AddEmployee';
import ShiftCancel from './processShiftCancel';
import { useState } from 'react';
import ManagerDashboard from './managerDashboard';
import { compareTimings } from '../controller/reportController';

function LatecomerReports() {
  const [reportButtonPressed, setReportButtonPressed] = useState(false);
  const [shiftButtonPressed, setShiftButtonPressed] = useState(false);
  const [assignButtonPressed, setAssignButtonPressed] = useState(false);
  const [employeeButtonPressed, setEmployeeButtonPressed] = useState(false);
  const [lateButtonPressed, setLateButtonPressed] = useState(false);
  const [mgerButtonPressed, setMgerButtonPressed] = useState(false);
  const [empId, setEmpId] = useState(''); // Initialize empId as an empty string
  const [date, setDate] = useState(''); // Initialize date as an empty string
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);
  const [lateShiftsCount, setLateShiftsCount] = useState(0);

  const handleReportButtonClick = () => {
    // Set the state to indicate that the button has been pressed
    setReportButtonPressed(true);
    setShiftButtonPressed(false);
  }


  const handleShiftButtonClick = () => {
    setShiftButtonPressed(true);
    setReportButtonPressed(false);
  }

  const handlePythonScriptButtonClick = async () => {
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

  const handleMgerButtonPressed = async () => {
    setShiftButtonPressed(false);
    setReportButtonPressed(false);
    setAssignButtonPressed(false);
    setEmployeeButtonPressed(false);
    setLateButtonPressed(false);
    setMgerButtonPressed(true);
  }

  const handleEmpIdChange = (event) => {
    setEmpId(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = () => {
    // Fetch data when the user submits the form
    compareTimings(empId, date)
      .then((data) => {
        setReportData(data);

        if (data && data.message === 'Clock-in time is later than shift start time') {
          setLateShiftsCount((count) => count + 1);
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

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
        <LatecomerReports/> 
      ) : mgerButtonPressed ? (
        <ManagerDashboard/>
      ) : (
        <div>
          <div className='mgernav'>
            <h4>EverGreen Solutions - Manager Dashboard</h4>
            <button onClick={handleReportButtonClick}>Working Hours Report</button>
            <button onClick={handlePythonScriptButtonClick}>Assign Employees</button>
            <button onClick={handleShiftButtonClick}>Process Shift Cancellation Requests</button>
            <button onClick={handleEmployeeButtonClick}>Add Employees</button>
            <button onClick={handleLateButtonClick}>Clock In Reports</button>
            <button onClick={handleMgerButtonPressed}>Go to home page</button>
          </div>
          <h1>View Clock-In Reports</h1>
          <p>Please select below</p>
          <form>
            <label>
              Employee ID:
              <input type="text" value={empId} onChange={handleEmpIdChange} />
            </label>
          <br />
            <label>
              Date:
              <input type="text" value={date} onChange={handleDateChange} />
            </label>
          <br />
            <button type="button" onClick={handleSubmit}>
            Submit
            </button>
        </form>

      {error && <p>Error: {error.message}</p>}

      {reportData && (
        <div>
          <p>Report Data:</p>
          <pre>{JSON.stringify(reportData, null, 2)}</pre>
        </div>
      )}

      <p>Number of Shifts Late: {lateShiftsCount}</p>
        </div>
      )}
    </>
  );
}

export default LatecomerReports;
