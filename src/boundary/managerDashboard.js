import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Report from './report';
import { managerDashboard , getCalendarInfo, getCalendarInfoByShiftID} from '../controller/managerDashboardController';
import axios from 'axios';
import ShiftCancel from './processShiftCancel';
import AssignEmployees from './assignEmployees';
import AddEmployee from './AddEmployee';
import LatecomerReports from './LatecomerReports';
import EventDetailsModal from './public/EventDetailsModal'; // Import the modal component

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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    populateCalendar();
  }, []);

  async function populateCalendar() {
    try {
      console.log("populate");
      let response = await getCalendarInfo();
      console.log("response: ", response);
      if (response) {
        const transformedEvents = response.map((shift) => ({
          id: shift.id,
          title: `Shift ${shift.id}`,
          name: shift.name,
          date: shift.date ? shift.date.split('T')[0] : '',
          start: shift.date && shift.start ? `${shift.date.split('T')[0]}T${shift.start}` : '',
          end: shift.date && shift.end ? `${shift.date.split('T')[0]}T${shift.end}` : '',
        }));

        setEvents(transformedEvents);
      } else {
        console.error("Response data is empty:", response);
      }
    } catch (e) {
      console.error("populate failed: " + e);
    }
  }

  async function handleEventClick(info) {
    try {
      let shiftIdParam = Number(info.event._def.publicId);
      let response = await getCalendarInfoByShiftID(shiftIdParam);
      if (response) {

        const transformedShifts = {
          title: `Shift ${response[0].id}`,
          name: response[0].name,
          date: response[0].date ? response[0].date.split('T')[0] : '',
          start: response[0].date && response[0].start ? `${response[0].date.split('T')[0]}T${response[0].start}` : '',
          end: response[0].date && response[0].end ? `${response[0].date.split('T')[0]}T${response[0].end}` : '',
        }
        // Set the selected event for the modal
        console.log("transformedShifts: ", transformedShifts)
        setSelectedEvent({ transformedShifts });

      }

    } catch (e) {
      console.error("populate failed: " + e);
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
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

  useEffect(() => {
    const getName = async () => {
      try {
        const response = await managerDashboard(userEmail);

        if (response && response.message === 'ok') {
          const userName = response.managerName;
          setUserName(userName);
        } else {
          setError('Invalid credentials. Please try again.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
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
            eventClick={handleEventClick}
            timeZone="local"
          />
          {/* Render the modal if an event is selected */}
          {selectedEvent && (
            <EventDetailsModal eventDetails={selectedEvent} onClose={handleCloseModal} />
          )}

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


}

export default ManagerDashboard;
