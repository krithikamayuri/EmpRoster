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

function ManagerDashboard(props) {
  //const [events, setEvents] = useState([]);
  const [reportButtonPressed, setReportButtonPressed] = useState(false);
  const [shiftButtonPressed, setShiftButtonPressed] = useState(false);
  const [assignButtonPressed, setAssignButtonPressed] = useState(false);
  const [userName, setUserName] = useState('');
  const { userEmail } = props;
  const [error, setError] = useState('');
  const [messages, setMessages] = useState({});

  /*
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
*/
  const handleReportButtonClick = () => {
    // Set the state to indicate that the button has been pressed
    setReportButtonPressed(true);
    setShiftButtonPressed(false);
  }

  const getMessages = async () => {
    try {
      const response = await axios.get('/api/messages');
      if (response.status === 200) {
        const data = response.data;
        setMessages(data);
        console.log('Received messages from server:', data);
      } else {
        console.error("Failed to retrieve messages. Status code:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while retrieving messages:", error);
    }
  };

  const handleShiftButtonClick = () => {
    setShiftButtonPressed(true);
    setReportButtonPressed(false);
  }

  const handlePythonScriptButtonClick = async () => {
    setShiftButtonPressed(false);
    setReportButtonPressed(false);
    setAssignButtonPressed(true);
    /*
    try {
      // Make a request to the server endpoint that runs the Python script
      const response = await axios.post('/api/runPy');
     
      // Handle the response from the server
      console.log(response.data);
      
      // Get messages after running python script
      //
    } catch (error) {
      console.error('An error occurred:', error);
    }
    */
  };
  
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
  
  useEffect(() => {
    getMessages();
  }, );

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
          ) : (
            <div>
            <h2>Welcome to the Manager Dashboard, {userName} </h2>
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleReportButtonClick}>Go to Report</button>
            <button onClick={handlePythonScriptButtonClick}>Assign Employees</button>
            <button onClick={handleShiftButtonClick}>Process Shift Cancellation Requests</button>
            <div>
            {messages.unsuccessfulMsg && <p>{messages.unsuccessfulMsg}</p>}
            {messages.staffShortage && <p>{messages.staffShortage}</p>}
            {messages.staffShortage1 && <p>{messages.staffShortage1}</p>}
            {messages.person && <p>{messages.person}</p>}
            {messages.noLeave && <p>{messages.noLeave}</p>}
            {messages.success && <p>{messages.success}</p>}
            </div>

            {messages.message && (
    <pre>{messages.message}</pre>
  )}

            <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
       // events={events}
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
}

export default ManagerDashboard;
