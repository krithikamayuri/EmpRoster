import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Availability = ({ events }) => {
  const handleGoBack = () => {
    window.history.back(); // This will take the user back to the previous page
  };

  return (
    <div>
      <h1>Please pick your preferred schedule</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
      <button onClick={handleGoBack}>Previous page</button>
    </div>
  );
};

export default Availability;
