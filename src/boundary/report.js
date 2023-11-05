import React, { useEffect, useState } from 'react';
import EmployeeDetails from './EmployeeReport';
import { getEmpName } from '../controller/reportController';

const Report = () => {
  const [empName, setEmpName] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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

  return (
    <div>
      <h1>Generate Reports</h1>
      <p>Click on the name of an employee to view reports</p>
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
  );
};

export default Report;
