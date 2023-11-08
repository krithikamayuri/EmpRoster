import React from 'react';
import Report from './report';
import AssignEmployees from './assignEmployees';
import AddEmployee from './AddEmployee';
import ShiftCancel from './processShiftCancel';
import { useState } from 'react';
import ManagerDashboard from './managerDashboard';

function LatecomerReports() {
  const [reportButtonPressed, setReportButtonPressed] = useState(false);
  const [shiftButtonPressed, setShiftButtonPressed] = useState(false);
  const [assignButtonPressed, setAssignButtonPressed] = useState(false);
  const [employeeButtonPressed, setEmployeeButtonPressed] = useState(false);
  const [lateButtonPressed, setLateButtonPressed] = useState(false);
  const [mgerButtonPressed, setMgerButtonPressed] = useState(false);

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

          <h1>Reports on Clock-In Timings</h1>
        </div>
      )}
    </>
  );
}

export default LatecomerReports;
