import React, { useEffect, useState } from 'react';
import EmployeeDetails from './EmployeeReport';
import { getEmpName } from '../controller/reportController';
import AssignEmployees from './assignEmployees';
import AddEmployee from './AddEmployee';
import ShiftCancel from './processShiftCancel';
import LatecomerReports from './LatecomerReports';
import ManagerDashboard from './managerDashboard';

const Report = () => {
  const [empName, setEmpName] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [reportButtonPressed, setReportButtonPressed] = useState(false);
  const [shiftButtonPressed, setShiftButtonPressed] = useState(false);
  const [assignButtonPressed, setAssignButtonPressed] = useState(false);
  const [employeeButtonPressed, setEmployeeButtonPressed] = useState(false);
  const [lateButtonPressed, setLateButtonPressed] = useState(false);
  const [mgerButtonPressed, setMgerButtonPressed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEmpName();
        setEmpName(data.empNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Run this effect once on component mount

  const handleEmployeeClick = (employeeName) => {
    setSelectedEmployee(employeeName);
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

  const handleMgerButtonClick = async () => {
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
              <button onClick={handleMgerButtonClick}>Go to home page</button>
            </div>
          </div>

          <h1>Generate Reports on Hours Worked</h1>
          <p>Click on the name of an employee to view and download reports</p>
          {empName ? (
            <ul style={{ listStyle: "none" }}>
              {empName.map((emp, index) => (
                <li key={index}>
                  <button className='btn btn-outline-info btn-sm w-25 mb-2' onClick={() => handleEmployeeClick(emp)}>{emp}</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No employee names available</p>
          )}

          {selectedEmployee && (
            <EmployeeDetails employeeName={selectedEmployee} />
          )}
        </div>
      )}
    </>
  );
};

export default Report;
