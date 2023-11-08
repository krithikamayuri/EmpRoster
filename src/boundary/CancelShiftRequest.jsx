import React, { useState, useEffect } from 'react';
import axios from 'axios';



const CancelShiftRequest = (props) => {
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const { employeeId: empId } = props;
  const currentDate = new Date(); // Get the current date
  console.log(empId)
  useEffect(() => {
    // getting the employee's shifts
    axios.get(`/api/fetchShifts/${props.employeeId}`)
      .then((response) => {
        console.log(response.data);
        if(response.data.status === true){
            setShifts(response.data.data);

        }
      })
      .catch((error) => {
        console.error('Error fetching shifts:', error);
      });
  }, [props.userEmail]);

  const handleGoBack = () => {
    window.history.back(); // This will take the user back to the previous page
  };
  
  const handleCancelShift = () => {
    if (selectedShift) {
      const formData = new FormData();
      formData.append('shiftId', selectedShift.shiftID);
      formData.append('message', message);
      formData.append('empId', empId);
  
      if (file) {
        formData.append('file', file);
      } else {
        // If file is not available, append a null value
        formData.append('file', null);
      }
  
      if (message !== '') {
        axios
          .post('/api/cancelShiftRequest', formData)
          .then((response) => {
            console.log('Shift canceling request sent:', response.data);
            alert('Cancellation request sent successfully');
          })
          .catch((error) => {
            console.error('Error canceling shift:', error);
            alert('Error in sending request');
          });
      } else {
        alert('Please provide a cancellation reason');
      }
    }
  };
  
  

  return (
    <div>
    <div className='mt-5'>
    <div className="container">
    <div className="card" style = {{border: '1px solid black'}}>
    <div className="card-header text-white" style={{background: 'linear-gradient(to bottom, green, #395144'}}>
      <h1>Employee Shifts</h1>

    </div>
    <table className="table">
      <thead>
        <tr>
          <th>Shift ID</th>
          <th>Shift Date</th>
          <th>Shift Start time</th>
          <th>Shift End Time</th>
          <th>Send Request</th>
        </tr>
      </thead>
      <tbody>
        {shifts.length !== 0 ? (
          shifts.map((shift) => {
            const shiftDate = new Date(shift.shiftDate);

            // Check if the shift date is in the future
            if (shiftDate > currentDate) {
              return (
                <tr key={shift.shiftID}>
                  <td>{shift.shiftID}</td>
                  <td>{new Date(shiftDate).toISOString().split('T')[0]}</td>
                  <td>{shift.shiftStartTime}</td>
                  <td>{shift.shiftEndTime}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => setSelectedShift(shift)}
                      data-bs-toggle="modal"
                      data-bs-target="#cancelModal"
                    >
                      Cancel Request
                    </button>
                  </td>
                </tr>
              );
            }
            return null; // Return null if the shift date is not in the future
          })
        ) : (
          <tr>
            <td colSpan="5" ><p className="alert alert-danger " role="alert" >No shifts found</p></td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

     

      {/* Cancel Shift Modal */}
      <div className="modal fade" id="cancelModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Cancel Shift</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="shiftId">Shift ID</label>
                <input type="text" className="form-control" id="shiftId" value={selectedShift ? selectedShift.shiftID : ''} disabled />
              </div>
              <div className="form-group">
                <label htmlFor="message">Cancellation Reason</label>
                <textarea className="form-control" id="message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="file">Upload File (Optional)</label>
                <input type="file" className="form-control" id="file" onChange={(e) => setFile(e.target.files[0])} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleCancelShift}>Confirm Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button onClick={handleGoBack} className='btn btn-outline-dark m-4'><i class="ri-arrow-left-line"></i>Previous page</button>
    </div>
  );
};

export default CancelShiftRequest;
