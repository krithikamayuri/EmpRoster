import jsPDF from 'jspdf';
const React = require('react');
const { useState, useEffect } = require('react');
const { employeeReport } = require('../controller/shiftController');
require('jspdf-autotable');

//method to calculate the hours worked for each employee according to shifts
const calculateHoursWorked = (startTime, endTime) => {
  if (!startTime || !endTime) {
    return 'Invalid time data'; // Handle missing or invalid data
  }

  //The format of the time will be in HH:mm:ss so split by the ':'
  const startParts = startTime.split(':');
  const endParts = endTime.split(':');

  if (startParts.length !== 3 || endParts.length !== 3) {
    return 'Invalid time format'; // Handle invalid time parsing
  }

  const startHour = parseInt(startParts[0], 10);
  const startMinute = parseInt(startParts[1], 10);
  const startSecond = parseInt(startParts[2], 10);

  const endHour = parseInt(endParts[0], 10);
  const endMinute = parseInt(endParts[1], 10);
  const endSecond = parseInt(endParts[2], 10);

  if (
    isNaN(startHour) || isNaN(startMinute) || isNaN(startSecond) ||
    isNaN(endHour) || isNaN(endMinute) || isNaN(endSecond)
  ) {
    return 'Invalid time format'; // Handle invalid time parsing
  }

  const startTotalMinutes = startHour * 60 + startMinute + startSecond / 60;
  const endTotalMinutes = endHour * 60 + endMinute + endSecond / 60;

  const durationInMinutes = endTotalMinutes - startTotalMinutes;
  const durationInHours = durationInMinutes / 60;

  return durationInHours.toFixed(2); // Round to two decimal places
};


const EmployeeDetails = ({ employeeName }) => {
  const [shiftInfo, setShiftInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await employeeReport(employeeName);
        setShiftInfo(data.shifts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [employeeName]);

  //method to generate pdf of report generated
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add the employee's name to the PDF
    doc.text(`${employeeName}'s Shifts`, 10, 10);

    // Create the PDF content
    if (Array.isArray(shiftInfo)) {
      const shiftsData = [];
      
      shiftInfo.forEach((shift) => {
        const formattedDate = new Date(shift.shift_date).toLocaleDateString();
        const hoursWorked = calculateHoursWorked(shift.shift_start, shift.shift_end);

        // Push shift data to the table as an array
        shiftsData.push([shift.shift_id, formattedDate, shift.shift_start, shift.shift_end, `${hoursWorked} hours`]);
      });

      // Define table headers
      const headers = ['Shift ID', 'Date of Shift', 'Shift Start Time', 'Shift End Time', 'Hours Worked'];

      // Create a table with headers and data
      doc.autoTable({
        head: [headers],
        body: shiftsData,
        startY: 10 // Adjust the Y-coordinate for the table
      });
    } else if (shiftInfo) {
      // Handle the case when shiftInfo is not an array (so only one shift returned from db)
      const formattedDate = new Date(shiftInfo.shift_date).toLocaleDateString();
      const hoursWorked = calculateHoursWorked(shiftInfo.shift_start, shiftInfo.shift_end);

      const data = [[shiftInfo.shift_id, formattedDate, shiftInfo.shift_start, shiftInfo.shift_end, `${hoursWorked} hours`]];
      
      // Define table headers
      const headers = ['Shift ID', 'Date of Shift', 'Shift Start Time', 'Shift End Time', 'Hours Worked'];

      // Create a table with headers and data
      doc.autoTable({
        head: [headers],
        body: data,
        startY: 10 // Adjust the Y-coordinate for the table
      });
    }

    // Generate the PDF file name with the employee's name
    const employeeNameForFileName = employeeName.replace(/\s+/g, '_');
    const pdfFileName = `${employeeNameForFileName}_shifts.pdf`;

    doc.save(pdfFileName);
  };

  
  
  
  
  //display the report generated for each employee as a table
  return (
    <div>
      <h4 style={{ textAlign: 'center' }}>Shift Information for {employeeName}</h4>
      {Array.isArray(shiftInfo) ? (
        <table className="table">
          <thead>
            <tr>
              <th>Shift ID</th>
              <th>Date of Shift</th>
              <th>Shift Start Time</th>
              <th>Shift End Time</th>
              <th>Number of Hours Worked</th>
            </tr>
          </thead>
          <tbody>
            {shiftInfo.map((shift, index) => (
              <tr key={index}>
                <td>{shift.shift_id}</td>
                <td>{new Date(shift.shift_date).toLocaleDateString()}</td>
                <td>{shift.shift_start}</td>
                <td>{shift.shift_end}</td>
                <td>{calculateHoursWorked(shift.shift_start, shift.shift_end)} hours</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : shiftInfo ? (
        <table className="table">
          <thead>
            <tr>
              <th>Shift ID</th>
              <th>Date of Shift</th>
              <th>Shift Start Time</th>
              <th>Shift End Time</th>
              <th>Number of Hours Worked</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{shiftInfo.shift_id}</td>
              <td>{new Date(shiftInfo.shift_date).toLocaleDateString()}</td>
              <td>{shiftInfo.shift_start}</td>
              <td>{shiftInfo.shift_end}</td>
              <td>{calculateHoursWorked(shiftInfo.shift_start, shiftInfo.shift_end)} hours</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>There are no shifts listed under this employee</p>
      )}
      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
  
  
};

export default EmployeeDetails;
