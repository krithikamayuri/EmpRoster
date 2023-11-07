import React, { useEffect, useState } from 'react';
import EmployeeDetails from './EmployeeReport';
import { getEmpName } from '../controller/reportController';
import AssignEmployees from './assignEmployees';
import AddEmployee from './AddEmployee';
import ShiftCancel from './processShiftCancel';
import LatecomerReports from './LatecomerReports';

const Report = () => {
  const [empName, setEmpName] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [reportButtonPressed, setReportButtonPressed] = useState(false);
  const [shiftButtonPressed, setShiftButtonPressed] = useState(false);
  const [assignButtonPressed, setAssignButtonPressed] = useState(false);
  const [employeeButtonPressed, setEmployeeButtonPressed] = useState(false);
  const [lateButtonPressed, setLateButtonPressed] = useState(false);

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
    ) : (
    <div>
      <div className='mgernav'>
        <h4>EverGreen Solutions - Manager Dashboard</h4>
        <button onClick={handleReportButtonClick}>Working Hours Report</button>
        <button onClick={handlePythonScriptButtonClick}>Assign Employees</button>
        <button onClick={handleShiftButtonClick}>Process Shift Cancellation Requests</button>
        <button onClick={handleEmployeeButtonClick}>Add Employees</button>
        <button onClick={handleLateButtonClick}>Clock In Reports</button>
      </div>
      
      <h1>Generate Reports on Hours Worked</h1>
      <p>Click on the name of an employee to view and download reports</p>
      {empName ? (
        <ul>
          {empName.map((emp, index) => (
            <li key={index}>
              <button onClick={() => handleEmployeeClick(emp)}>{emp}</button>
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
