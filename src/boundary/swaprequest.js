import React, { useEffect, useRef, useState } from 'react';
import {
  createShiftSwapRequest,
  getEmployeeByEmailAsync,
  getEmployeesAsync,
  getShiftsByEmployee
} from "../controller/employeeDashboardController";
import moment from "moment";

const SwapRequest = ({ empEmail, employeeId }) => {
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]);
  const selectedEmp = useRef(null);
  const message = useRef('');
  const selectedShiftRef = useRef(null);
  const [responseStatus, setResponseStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [shiftPendingStatus, setShiftPendingStatus] = useState({});

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSwapRequest = async (shift) => {
    setIsLoading(true);
    const currentEmp = employees.filter((emp) => emp.emp_email === empEmail);

    const data = {
      requestedBy: currentEmp[0].emp_id,
      requestedTo: parseInt(selectedEmp.current.value),
      shiftId: shift.shiftID,
      message: message.current.value,
      status: 'pending',
      date: moment(shift.shiftDate).format("YYYY-MM-DD")
    };

    const response = await createShiftSwapRequest(data);
    console.log('response ', response);
    if (response.status === true) {
      setResponseStatus(true);
      setShiftPendingStatus(prevStatus => ({ ...prevStatus, [shift.shiftID]: true }));
      setIsLoading(false);
    }

    console.log("responseStatus: ", responseStatus);
  };

  const handleModalOpen = (shift) => {
    setResponseStatus(false);
    setIsPending(false);
    setIsLoading(false);
    selectedShiftRef.current = shift;
    console.log(selectedShiftRef.current);
  };

  useEffect(() => {
    async function getEmployeeByEmail(empEmail) {
      const emp = await getEmployeeByEmailAsync(empEmail);
      setEmployee(emp);
    }
    getEmployeeByEmail(empEmail);

    async function getAllEmployees() {
      const employees = await getEmployeesAsync();
      setEmployees(employees);
    }
    getAllEmployees();

    async function getShiftsByEmployeeAsync(employeeId) {
      const shifts = await getShiftsByEmployee(employeeId);
      setShifts(shifts);
    }
    getShiftsByEmployeeAsync(employeeId);

  }, []);

  return (
    <>
      <div>
        <div className='mt-5'>
          <div className='container'>
            <div className="card" style={{ border: '1px solid black' }}>
              <div className="card-header text-white" style={{ background: 'linear-gradient(to bottom, green, #395144)' }}>
                <h1>Shifts Assigned To Me</h1>
              </div>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th>Shift ID</th>
                    <th>Shift Date</th>
                    <th>Emp Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {shifts && shifts.map((shift, index) => {
                    const isShiftPending = shiftPendingStatus[shift.shiftID];

                    return (
                      <tr key={index}>
                        <td>{shift.shiftID}</td>
                        <td>{moment(shift.shiftDate).format("MM-DD-YYYY")}</td>
                        <td>{shift.emp_name}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleModalOpen(shift)}
                            className={`btn btn-outline-primary btn-sm ${isShiftPending ? 'disabled' : ''}`}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            disabled={isShiftPending}
                          >
                            {isShiftPending ? (
                              <>
                                <div className="spinner-border text-dark spinner-border-sm me-2" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                                Pending
                              </>
                            ) : (
                              'Swap Shift'
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Select Employee</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {responseStatus && (
                        <div className='alert alert-success'>Request Sent Successfully</div>
                      )}
                      <p>Select Employee To Swap Request</p>
                      <select className='form-control' ref={selectedEmp}>
                        {employees.length && employees.map((emp, index) => {
                          return (
                            (emp.emp_email !== empEmail) ? <option value={emp.emp_id} key={index}>{emp.emp_name}</option> : null
                          );
                        })}
                      </select>
                      <div className='mt-3'>
                        <p>Write Message</p>
                        <textarea className='form-control' ref={message}></textarea>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleSwapRequest(selectedShiftRef.current)}
                        disabled={isPending}
                      >
                        {isPending ? (
                          <>
                            <div className="spinner-border text-dark spinner-border-sm me-2" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            Pending
                          </>
                        ) : (
                          'Send Request'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleGoBack} className='btn btn-outline-dark m-4'><i class="ri-arrow-left-line"></i>Previous page</button>
      </div>
    </>
  );
};

export default SwapRequest;
