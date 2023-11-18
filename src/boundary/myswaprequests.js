import React, {useEffect, useRef, useState} from 'react';
import {
  createShiftSwapRequest, getEmployeeByEmailAsync,
  getEmployeesAsync,
  getShiftsByEmployee, getSwapShiftRequests, getSwapShiftRequestsAsync, updateSwapShiftRequest
} from "../controller/employeeDashboardController";
import moment from "moment"

const MySwapRequests = ({empEmail, employeeId}) => {
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const [message, setMessage] = useState("");
  const [responseStatus, setResponseStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employee, setEmployee] = useState(null);

  const requestId = useRef(0);
  const shiftId  = useRef(0);


  const handleGoBack = () => {
    window.history.back(); // This will take the user back to the previous page
  };


  // update swap shift request status
  const handleRequestStatus = async (status) => {
    const data = {
      "swapReqId": requestId.current,
      "status": status,
      "shiftId": shiftId.current,
      "requestedTo": employee.emp_id,
      "emp_name": employee.emp_name
    }
    const response =  await updateSwapShiftRequest(data);
    if(response.status === true) {
      setResponseStatus(true);
      setIsLoading(false);
    }
    getSwapShiftRequests(employeeId);
  }

  // handle on click modal btn
  const handleModalOpen = (reqId, shift_Id, msg) => {
    setResponseStatus(false);
    setIsLoading(false);
     requestId.current = reqId;
    shiftId.current = shift_Id;
    setMessage(msg);
  }


// get requests
  async function getSwapShiftRequests(employeeId) {
    setIsLoading(true);
    const res = await getSwapShiftRequestsAsync(employeeId);
    if(res.status === true) {
      setSent(res.requests_sent);
      setReceived(res.requests_received);
    }
    setIsLoading(false);
  }

useEffect( () => {

    getSwapShiftRequests(employeeId);

    // get employee
    async function getEmployeeByEmail(email) {
      const res = await getEmployeeByEmailAsync(email);
      if(res.success === true) {
        setEmployee(res.employee);
      }
    }

    getEmployeeByEmail(empEmail);

  }, []);


  return (
      <>
      <div>
      <div className='mt-5'>
          <div className='container'>
          <div className="card" style = {{border: '1px solid black'}}>
          <div className="card-header text-white" style ={{background: 'linear-gradient(to bottom, green, #395144'}}>
            <h1>Request received for shift swapping</h1>
          </div>

          <div>
            { isLoading === true ? <div className='text-center'><div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
            </div></div> : <table className='table table-hover'>
              <thead>
              <tr>
                <th>Request Id</th>
                <th>Shift Date</th>
                <th>Status</th>
                <th>Requested By</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              {
                  (received.length > 0) && received.map( (request, index) => {
                    return(
                        <tr key={index}>
                          <td>{request.swapReqId}</td>
                          <td>{moment(request.date).format("MM-DD-YYYY")}</td>
                          <td> <div className={ (request.status == 'accepted') ? 'p-1 alert alert-success p-1 text-capitalize text-center w-75' : (request.status == 'rejected') ? 'alert alert-danger p-1 text-capitalize text-center w-75' : 'alert alert-info p-1 text-capitalize text-center w-75' } >{request.status}</div> </td>
                          <td>{request.requestedByName}</td>
                          <td><button type="button" onClick={ () => handleModalOpen(request.swapReqId, request.shiftId, request.message)} className="btn btn-outline-primary btn-sm"
                                      data-bs-toggle="modal" data-bs-target="#exampleModal" disabled={ (request.status !== 'pending') ? true: false }>
                            Take Action
                          </button>

                          </td>
                        </tr>
                    )
                  })
              }
              </tbody>
          </table>
            }
          </div>




        </div>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Take Action</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {
                    responseStatus && (
                        <div className='alert alert-success'>Request Updated Successfully</div>
                    )
                }
                {/*<h5>Message from requester</h5>*/}
                <p>{message}</p>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={ () => handleRequestStatus('rejected')}>
                  {
                      isLoading && (
                          <div className="spinner-border text-dark spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                      )
                  }
                  Reject Request
                </button>
                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={ () => handleRequestStatus('accepted')}>
                  {
                      isLoading && (
                          <div className="spinner-border text-dark spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                      )
                  }
                  Accept Request
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        <button onClick={handleGoBack} className='btn btn-outline-dark m-4'><i class="ri-arrow-left-line"></i>Previous page</button>
        </div>
        </div>
      </>

  );
};

export default MySwapRequests;
