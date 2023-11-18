import React, { useEffect, useState, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import EmpNavbar from './empnavbar';
import Availability from './availabilitysub';
import Cancellation from './cancelshift';
import SwapRequest from './swaprequest';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { employeeDashboardController } from '../controller/employeeDashboardController';
import Avability from "../boundary/Avability"
import Empdashboardnav from './empdashboardnav';
import MySwapRequests from "./myswaprequests";
import CancelShiftRequest from './CancelShiftRequest';
import TimeTracking from './TimeTracking';
import Calendar from './calendar';


function EmployeeDashboard(props) {
  const { userEmail, employeeId } = props;
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [events, setEvents] = useState([]);


  //console.log("employee_id", employeeId);

  const getName = useCallback(async () => {
    try {
      const response = await employeeDashboardController(userEmail);

      if (response && response.message === 'ok') {
        const userName = response.employeeName;
        setUserName(userName);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred. Please try again later.');
    }
  }, [userEmail]); // Include userEmail in the dependencies array

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      <Router>
        <Empdashboardnav employeeId={employeeId} />
        <Routes>
          <Route path="/availabilitysub" element={<Availability />} />
          <Route path="/cancelshift" element={<Cancellation />} />
          <Route path="/swaprequest" element={<SwapRequest empEmail={userEmail} employeeId={employeeId} />} />
          <Route path="/myswaprequest" element={<MySwapRequests empEmail={userEmail} employeeId={employeeId} />} />
          <Route path="/availibility" element={<Avability userEmail={userEmail} />} />
          <Route path="/cancelshiftrequest" element={<CancelShiftRequest userEmail={userEmail} employeeId={props.employeeId} />} />
          <Route path="/timetracker" element={<TimeTracking userEmail={userEmail} />} />
          <Route path="/" element={<Calendar employeeId={employeeId} />} />
          {/*<Route path="/settings" element={<Settings />} />
          <Route path="/g-calendar" element={<GoogleCalendarComponent events={events} />} />*/}
        </Routes>
      </Router>
    </div>
  );
}

export default EmployeeDashboard;
