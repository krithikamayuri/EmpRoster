import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
//import axios from 'axios';
//import ManagerNavbar from './managernavbar';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Report from './report';
import { getUserName } from '../controller/managerDashboardController';
import axios from 'axios';
import ShiftCancel from './processShiftCancel';
import AssignEmployees from './assignEmployees';
import AddEmployee from './AddEmployee';
import LatecomerReports from './LatecomerReports';

function ManagerDashboard(props) {
  const [events, setEvents] = useState([]);
  const [reportButtonPressed, setReportButtonPressed] = useState(false);
  const [shiftButtonPressed, setShiftButtonPressed] = useState(false);
  const [assignButtonPressed, setAssignButtonPressed] = useState(false);
  const [employeeButtonPressed, setEmployeeButtonPressed] = useState(false);
  const [lateButtonPressed, setLateButtonPressed] = useState(false);
  const [userName, setUserName] = useState('');
  const { userEmail } = props;
  const [error, setError] = useState('');


  useEffect(() => {
    // Make a POST request to fetch events from the server
    axios.post('/calendar/fetch-events')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
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

  useEffect(() => {
    const getName = async () => {
      try {
        const response = await getUserName(userEmail);

        if (response && response.message === 'ok') {
          const userName = response.managerName;
          setUserName(userName);
        } else {
          setError('Invalid credentials. Please try again.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setError('An error occurred. Please try again later.');
      }
    };

    getName();
    // getMessages();
  }, [userEmail]);


  return (
    <div>
      {/*}
      <Router>
        <ManagerNavbar />
        <Routes>
          <Route path="/report" element={<Report />} />
          <Route path="/" element={
          */}

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
      ) : (
        <div>
          <h2 className='topGreenHeader text-white mb-0'>Welcome to the Manager Dashboard, {userName} </h2>
          {error && <p className="error-message">{error}</p>}
          <div className='manager_nav' style={{ background: 'linear-gradient(rgb(170, 139, 86), rgb(135, 100, 69))', padding: '10px', borderBottom: '2px solid black', color: "#fff", borderTop: '2px solid black' }}>
            <button onClick={handleReportButtonClick}>Working Hours Report</button>
            <button onClick={handlePythonScriptButtonClick}>Assign Employees</button>
            <button onClick={handleShiftButtonClick}>Process Shift Cancellation Requests</button>
            <button onClick={handleEmployeeButtonClick}>Add Employees</button>
            <button onClick={handleLateButtonClick}>Clock In Reports</button>
          </div>

          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventContent={renderEventContent}
            timeZone="local"
          />


        </div>
      )}

      {/*}
      } 
      />
        </Routes>
      </Router>
    */}
    </div>
  );

  function renderEventContent(info) {
    return (
      <div>
        <b>ID:</b> {info.event.id}
        <br />
        <b>Start Time:</b> {info.event.start.toLocaleTimeString()}
        <br />
        <b>End Time:</b> {info.event.end.toLocaleTimeString()}
      </div>
    );
  }
}

export default ManagerDashboard;
