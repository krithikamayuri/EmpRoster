import React from 'react';
import Report from './report';
import AssignEmployees from './assignEmployees';
import AddEmployee from './AddEmployee';
import ShiftCancel from './processShiftCancel';
import { useState } from 'react';
import ManagerDashboard from './managerDashboard';
import { useEffect } from 'react';
import axios from 'axios';

function LatecomerReports() {
  const [reportButtonPressed, setReportButtonPressed] = useState(false);
  const [shiftButtonPressed, setShiftButtonPressed] = useState(false);
  const [assignButtonPressed, setAssignButtonPressed] = useState(false);
  const [employeeButtonPressed, setEmployeeButtonPressed] = useState(false);
  const [lateButtonPressed, setLateButtonPressed] = useState(false);
  const [mgerButtonPressed, setMgerButtonPressed] = useState(false);
  const [lateComings, setLateComings] = useState([]);

  useEffect(() => {
    axios.get('/api/clockInReports')
      .then(response => setLateComings(response.data))
      .catch(error => {
        console.error(error);
        // Handle the error, e.g., set an error state or display a message to the user
      });
  }, []);

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
        <LatecomerReports />
      ) : mgerButtonPressed ? (
        <ManagerDashboard />
      ) : (
        <div>
          <div className='mgernav p-0'>
            <div className='mgernav topGreenHeader'>
              <h4>EverGreen Solutions - Manager Dashboard</h4>
            </div>
            <div className='manager_nav' style={{ background: 'linear-gradient(rgb(170, 139, 86), rgb(135, 100, 69))', padding: '10px', borderBottom: '2px solid black', color: "#fff", borderTop: '2px solid black' }}>
              <button onClick={handleReportButtonClick}>Working Hours Report</button>
              <button onClick={handlePythonScriptButtonClick}>Assign Employees</button>
              <button onClick={handleShiftButtonClick}>Process Shift Cancellation Requests</button>
              <button onClick={handleEmployeeButtonClick}>Add Employees</button>
              <button onClick={handleLateButtonClick}>Clock In Reports</button>
              <button onClick={handleMgerButtonPressed}>Go to home page</button>
            </div>

          </div>
          <div className='mt-3'>
            <div className="container">
              <div className="card">
                <div className="card-header bg-primary text-white p-0">
                  <h1 className='topGreenHeader mb-0'>Clock In Timings</h1>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Actual Clock-In Time</th>
                    </tr>
                    <tbody>
                    {Array.isArray(lateComings) && lateComings.map(latecoming => (
                      <tr key={latecoming.clock_id}>
                        <td>{latecoming.clock_name}</td>
                        <td>{latecoming.clock_date}</td>
                        <td>{latecoming.clock_time}</td>
                      </tr>
                    ))}
                    </tbody>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      )}
    </>
  );
}

export default LatecomerReports;
