import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RequestListTable() {
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
                  <td>{request.shiftId}</td>
                  <td>{request.message}</td>
                  <td>
                    {request.file && (
                      <a
                        href={`/api/downloadFile/${request.file}`}
                        download
                      >
                        Download File
                      </a>
                    )}
                  </td>
                  <td>{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RequestListTable;
