import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import interactionPlugin from '@fullcalendar/interaction';
import EventDetailsModal from './public/EventDetailsModal'; // Import the modal component
import { getCalendarInfo, getCalendarInfoByShiftID } from '../controller/employeeDashboardController';

function Calendar({ employeeId }) {
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    populateCalendar(employeeId);
  }, [employeeId]);

  async function handleEventClick(info) {
    try {
      let eventDate = new Date(info.event.start);
      let currentDate = new Date();

      let shiftIdParam = Number(info.event._def.publicId);
      console.log("shiftIdParam: ", shiftIdParam)
      let response = await getCalendarInfoByShiftID(shiftIdParam);
      if (response) {
        if (eventDate > currentDate) {
          const transformedShifts = {
            id: shiftIdParam,
            title: `Shift ${response[0].id}`,
            name: response[0].name,
            date: response[0].date ? response[0].date.split('T')[0] : '',
            start: response[0].date && response[0].start ? `${response[0].date.split('T')[0]}T${response[0].start}` : '',
            end: response[0].date && response[0].end ? `${response[0].date.split('T')[0]}T${response[0].end}` : '',
          }
          setSelectedEvent({ transformedShifts });
        } else {
          // Show a visual error message for past events
          setErrorMessage('Cannot click on past events.');
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000); // Clear the error message after 3 seconds
        }
      }
      else {
        setErrorMessage('Cannot load shift info.');
        console.error("events failed");
      }

    } catch (e) {
      console.error("populate failed: " + e);
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  async function populateCalendar(employeeIdParam) {
    try {
      console.log("populate");
      let response = await getCalendarInfo(employeeIdParam);
      console.log("response: ", response);
      if (response) {
        const transformedEvents = response.map((shift) => ({
          id: shift.id,
          title: `Shift ${shift.id}`,
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

  return (
    <div>
      {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
      />

      {/* Render the modal if an event is selected */}
      {selectedEvent && (
        <EventDetailsModal eventDetails={selectedEvent} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Calendar;
