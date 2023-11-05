import React, { useState, useEffect } from 'react';
import { getHoursWorked } from '../controller/shiftController';
import jsPDF from 'jspdf';

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
        const data = await getHoursWorked(employeeName);
        setShiftInfo(data.shifts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [employeeName]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
  
    // Create the PDF content
    if (Array.isArray(shiftInfo)) {
      shiftInfo.forEach((shift, index) => {
        const yCoordinate = 10 + index * 60; // Adjust the Y-coordinate for spacing
        const formattedDate = new Date(shift.shift_date).toLocaleDateString();
  
        doc.text(`Shift ID: ${shift.shift_id}`, 10, yCoordinate);
        doc.text(`Date of Shift: ${formattedDate}`, 10, yCoordinate + 10);
        doc.text(`Shift Start Time: ${shift.shift_start}`, 10, yCoordinate + 20);
        doc.text(`Shift End Time: ${shift.shift_end}`, 10, yCoordinate + 30);
        doc.text(`Number of hours worked: ${calculateHoursWorked(shift.shift_start, shift.shift_end)} hours`, 10, yCoordinate + 40);
        // Add other shift details as needed
      });
    } else if (shiftInfo) {
      // Handle the case when shiftInfo is not an array
      doc.text(`Shift ID: ${shiftInfo.shift_id}`, 10, 10);
      doc.text(`Date of Shift: ${shiftInfo.shift_date}`, 10, 20);
      doc.text(`Shift Start Time: ${shiftInfo.shift_start}`, 10, 30);
      doc.text(`Shift End Time: ${shiftInfo.shift_end}`, 10, 40);
      doc.text(`Number of hours worked: ${calculateHoursWorked(shiftInfo.shift_start, shiftInfo.shift_end)} hours`, 10, 50);
      // Add other shift details as needed
    }
  
    // Generate the PDF file name with the employee's name
    const employeeNameForFileName = employeeName.replace(/\s+/g, '_');
    const pdfFileName = `${employeeNameForFileName}_shifts.pdf`;

    doc.save(pdfFileName);
  };
  
  

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
