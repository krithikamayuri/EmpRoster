import React from 'react';
import '../public/css/EventDetailsModal.css'; // Import the CSS file for modal styling

function EventDetailsModal({ eventDetails, onClose }) {
  const handleAddEvent = async () => {
    // Call the addEvent function with eventDetails
    try {
      const response = await fetch('http://localhost:5000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventDetails),
      });

      if (response.ok) {
        console.log('Event added successfully!');
        // You can perform additional actions here, such as closing the modal or updating state
      } else {
        console.error('Failed to add event:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }

    onClose(); // Close the modal after adding the event
  };

  return (
    <div className="event-details-modal-overlay">
      <div className="event-details-modal">
        <div className="modal-header">
          <h2>Event Details</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p><strong>Title:</strong> {eventDetails.transformedShifts.title}</p>
          <p><strong>Name:</strong> {eventDetails.transformedShifts.name}</p>
          <p><strong>Date:</strong> {eventDetails.transformedShifts.date}</p>
          <p><strong>Start Time:</strong> {eventDetails.transformedShifts.start}</p>
          <p><strong>End Time:</strong> {eventDetails.transformedShifts.end}</p>
        </div>
        <div className="modal-footer">
          <button className="add-event-button" onClick={handleAddEvent}>Add Event</button>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsModal;
