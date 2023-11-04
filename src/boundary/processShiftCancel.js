import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShiftCancel() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await axios.get('/api/getCancelShiftRequests');

        if (response.data.status) {
          setRequests(response.data.data);
        } else {
          console.error('Failed to fetch requests');
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    }

    fetchRequests();
  }, []);

  const handleReject = async (requestId) => {
    try {
      const response = await axios.post(`/api/rejectRequest/${requestId}`);
      if (response.data.status) {
        // Update the status in the local state
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === requestId ? { ...request, status: 'rejected' } : request
          )
        );
      } else {
        console.error('Failed to reject request');
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      const response = await axios.post(`/api/approveRequest/${requestId}`);
      if (response.data.status) {
        // Update the status in the local state
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === requestId ? { ...request, status: 'accepted' } : request
          )
        );
      } else {
        console.error('Failed to approve request');
      }
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  return (
    <div className='mt-3'>
      <div className="container">
        <div className="card">
          <div className="card-header bg-primary text-white p-2">
            <h1>Shift Cancel Requests</h1>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Shift ID</th>
                <th>Message</th>
                <th>File Uploaded</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.empId}</td>
                  <td>{request.empName}</td>
                  <td>{request.shiftId}</td>
                  <td>{request.message}</td>
                  <td>
                  {request.file && (
                        <a
                          href={`/api/downloadFile/${request.file}`}
                          download
                          onClick={(e) => {
                            e.preventDefault(); // Prevent the default behavior of clicking a link
                            // Send a GET request to download the file
                            fetch(`/api/downloadFile/${request.file}`, {
                              method: 'GET',
                            })
                              .then((response) => {
                                if (response.ok) {
                                  // File download was successful
                                } else {
                                  // Handle the case when the file download failed
                                  console.error('Failed to download the file');
                                }
                              })
                              .catch((error) => {
                                console.error('Error downloading the file:', error);
                              });
                          }}
                        >
                          Download File
                        </a>
                      )}
                  </td>
                  <td>{request.status}</td>
                  <td>
                    <button onClick={() => handleApprove(request.id)} disabled={request.status !== 'pending'}>Approve</button>
                    <button onClick={() => handleReject(request.id)} disabled={request.status !== 'pending'}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShiftCancel;
