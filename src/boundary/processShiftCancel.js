import React, { useState, useEffect } from 'react';
import DownloadLink from './DownloadLink';
import Report from './report';
import AssignEmployees from './assignEmployees';
import AddEmployee from './AddEmployee';
import LatecomerReports from './LatecomerReports';
import ManagerDashboard from './managerDashboard';
import { getCancelShiftRequests } from '../controller/getCancelShiftController';
import { rejectShiftRequest } from '../controller/rejectShiftController';
import { approveShiftRequest } from '../controller/approveShiftController';

function ShiftCancel() {
  const [requests, setRequests] = useState([]);
  const [reportButtonPressed, setReportButtonPressed] = useState(false);
  const [shiftButtonPressed, setShiftButtonPressed] = useState(false);
  const [assignButtonPressed, setAssignButtonPressed] = useState(false);
  const [employeeButtonPressed, setEmployeeButtonPressed] = useState(false);
  const [lateButtonPressed, setLateButtonPressed] = useState(false);
  const [mgerButtonPressed, setMgerButtonPressed] = useState(false);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const data = await getCancelShiftRequests();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching shift cancellation requests:', error);
      }
    }

    fetchRequests();

    fetchRequests();
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

  const handleMgerButtonClick = async () => {
    setShiftButtonPressed(false);
    setReportButtonPressed(false);
    setAssignButtonPressed(false);
    setEmployeeButtonPressed(false);
    setLateButtonPressed(false);
    setMgerButtonPressed(true);
  }

  const handleReject = async (requestId) => {
    try {
      const response = await rejectShiftRequest(requestId);
      if (response.status) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === requestId ? { ...request, status: 'rejected' } : request
          )
        );
      } else {
        console.error('Failed to reject shift request');
      }
    } catch (error) {
      console.error('Error rejecting shift request:', error);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      const response = await approveShiftRequest(requestId);
      if (response.status) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === requestId ? { ...request, status: 'accepted' } : request
          )
        );
      } else {
        console.error('Failed to approve shift request');
      }
    } catch (error) {
      console.error('Error approving shift request:', error);
    }
  };

  return (
    <>
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
      ) : mgerButtonPressed ? (
        <ManagerDashboard />
      ) : (
        <div>
          <div className='mgernav p-0'>
            <div className='mgernav topGreenHeader'>
              <h4>EverGreen Solutions - Manager Dashboard</h4>
            </div>
            <div className='manager_nav' style={{ background: 'linear-gradient(rgb(170, 139, 86), rgb(135, 100, 69))', padding: '10px', borderBottom: '2px solid black', color: "#fff", borderTop: '2px solid black' }}>
              <button onClick={handleReportButtonClick}>Working Hours Report</button>
              <button onClick={handlePythonScriptButtonClick}>Assign Employees</button>
              <button onClick={handleShiftButtonClick}>Process Shift Cancellation Requests</button>
              <button onClick={handleEmployeeButtonClick}>Add Employees</button>
              <button onClick={handleLateButtonClick}>Clock In Reports</button>
              <button onClick={handleMgerButtonClick}>Go to home page</button>
            </div>

          </div>
          <div className='mt-3'>
            <div className="container">
              <div className="card">
                <div className="card-header bg-primary text-white p-2 topGreenHeader">
                  <h1 className=''>Shift Cancel Requests</h1>
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
                  {Array.isArray(requests) && requests.map((request) => {
                      const isAccepted = request.status === 'accepted';
                      const isPending = request.status === 'pending';

                      return (
                        <tr key={request.id}>
                          <td>{request.id}</td>
                          <td>{request.empId}</td>
                          <td>{request.empName}</td>
                          <td>{request.shiftId}</td>
                          <td>{request.message}</td>
                          <td><DownloadLink filename={request.file} /></td>
                          <td
                            style={{ color: isAccepted ? 'green' : isPending ? 'black' : 'red' }}
                          >
                            {request.status}
                          </td>
                          <td>
                            <button className='greenBt' onClick={() => handleApprove(request.id)} disabled={request.status !== 'pending'}>Approve</button>
                            <button className='redBt' onClick={() => handleReject(request.id)} disabled={request.status !== 'pending'}>Reject</button>
                          </td>
                        </tr>
                      );
                    })}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShiftCancel;
