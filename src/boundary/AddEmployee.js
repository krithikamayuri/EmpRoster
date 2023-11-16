import React, { useState } from 'react';
import Report from './report';
import AssignEmployees from './assignEmployees';
import LatecomerReports from './LatecomerReports';
import ShiftCancel from './processShiftCancel';
import ManagerDashboard from './managerDashboard';
import { addEmployee } from '../controller/addEmployeeController';

function AddEmployee() {
  const [emp_phoneno, setEmp_phoneno] = useState("");
  const [emp_emergency_contact, setEmp_emergencycont] = useState("");
  const [emp_psw, setEmp_psw] = useState("");
  const [emp_email, setEmp_email] = useState("");
  const [emp_name, setemp_name] = useState("");
  const [emp_address, setEmp_address] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [reportButtonPressed, setReportButtonPressed] = useState(false);
  const [shiftButtonPressed, setShiftButtonPressed] = useState(false);
  const [assignButtonPressed, setAssignButtonPressed] = useState(false);
  const [employeeButtonPressed, setEmployeeButtonPressed] = useState(false);
  const [lateButtonPressed, setLateButtonPressed] = useState(false);
  const [mgerButtonPressed, setMgerButtonPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emp_type, setEmp_type] = useState("partTime");

  // Error state for each input field
  const [errors, setErrors] = useState({
    emp_phoneno: "",
    emp_emergency_contact: "",
    emp_psw: "",
    emp_email: "",
    emp_name: "",
    emp_address: "",
    confirmPassword: "",
    emp_type: "",
  });

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

  const handlesubmit = () => {
    // Clear previous errors
    setErrors({

      emp_phoneno: "",
      emp_emergency_contact: "",
      emp_psw: "",
      emp_email: "",
      emp_name: "",
      emp_address: "",
      confirmPassword: "",
      emp_type: "",
    });

    if (isLoading) {
      return; // Prevent multiple submissions while the request is in progress
    }

    setFormSubmitted(true);
    let formIsValid = true;

    if (!emp_phoneno) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emp_phoneno: "Phone Number is required",
      }));

      formIsValid = false;
    }
    if (!emp_emergency_contact) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emp_emergency_contact: "Emergency contact is required",
      }));
      formIsValid = false;
    }
    if (!emp_phoneno || emp_phoneno.length !== 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emp_phoneno: "Phone Number must be exactly 8 digits long",
      }));
      formIsValid = false;
    }
    if (!emp_psw) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emp_psw: "Password is required",
      }));
      formIsValid = false;
    }
    if (!emp_email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emp_email: "Email is required",
      }));
      formIsValid = false;
    }
    if (!emp_name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emp_name: "Name is required",
      }));
      formIsValid = false;
    }
    if (!emp_address) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emp_address: "Address is required",
      }));
      formIsValid = false;
    }
    if (!confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Confirm Password is required",
      }));
      formIsValid = false;
    }

    if (emp_psw !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      formIsValid = false;
      return;
    }

    if (Object.values(errors).some((error) => error)) {
      // If there are any errors, prevent form submission
      return;
    }

    if(formIsValid){

      const formdata = {

        emp_psw,
        emp_email,
        emp_name,
        emp_phoneno,
        emp_emergency_contact,
        emp_address,
        emp_type,
      };
      if (!emp_phoneno || !emp_emergency_contact || !emp_psw || !emp_email || !emp_name || !emp_address || !confirmPassword) {
        return;
      }
      setIsLoading(true); // Set loading state to true
      //axios
      //  .post('/api/createEmployee', formdata)
      addEmployee(formdata)
        .then((response) => {
          console.log('Data saved successfully:', response.data);

          // Clear input fields after successful submission

          setEmp_psw("");
          setEmp_email("");
          setemp_name("");
          setEmp_phoneno("");
          setEmp_address("");
          setEmp_emergencycont("");
          setConfirmPassword("");
          setEmp_type("");

          setIsLoading(false);
          alert(response.data.msg);
        })
        .catch((error) => {
          setErrorMessage("Error saving data.");
          setIsLoading(false);
        });
    } else {
      setErrorMessage("Please fill in all required fields.");
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
          <div className="system-form mt-5" style={{ width: "70%", margin: "auto" }}>
            <h3 className='text-center'>Create Employee Account</h3>

            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label style={{ fontWeight: "bold" }}>Full Name</label>
                <input
                  type="text"
                  name="emp_name"
                  style={{ width: "90%" }}
                  value={emp_name}
                  required
                  onChange={(e) => { setemp_name(e.target.value) }}
                />
                <span className="text-danger">{errors.emp_name}</span> {/* Display error message */}
              </div>

              <div className="row">
                <div className="col-md-6 mt-md-0 mt-3">
                  <label style={{ fontWeight: "bold" }}>Employee Type</label>
                  <select
                    name="emp_type"
                    style={{ width: "90%" }}
                    value={emp_type}
                    onChange={(e) => { setEmp_type(e.target.value) }}
                  >
                    <option value="partTime">partTime</option>
                    <option value="fullTime">fullTime</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6 mt-md-0 mt-3">
                <label style={{ fontWeight: "bold" }}>Phone Number</label>
                <input
                  type="number"
                  name="emp_phoneno"
                  style={{ width: "90%" }}
                  value={emp_phoneno}
                  required
                  onChange={(e) => {
                    const enteredValue = e.target.value;
                    if (/^\d{0,8}$/.test(enteredValue)) {
                      setEmp_phoneno(enteredValue);
                    }
                  }}
                />
                {(formSubmitted && emp_phoneno.length !== 8) && (
                  <span className="text-danger">Phone number must be exactly 8 digits long</span>
                )}
              </div>

              <div className="col-md-6 mt-md-0 mt-3">
                <label style={{ fontWeight: "bold" }}>Emergency Contact</label>
                <input
                  type="number"
                  name="emp_emergency_contact"
                  style={{ width: "90%" }}
                  value={emp_emergency_contact}
                  required
                  onChange={(e) => {
                    const enteredValue = e.target.value;
                    if (/^\d{0,8}$/.test(enteredValue)) {
                      setEmp_emergencycont(enteredValue);
                    }
                  }}
                />
                {(formSubmitted && emp_emergency_contact.length !== 8) && (
                  <span className="text-danger">Phone number must be exactly 8 digits long</span>
                )}
              </div>

            </div>
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label style={{ fontWeight: "bold", display: 'block' }}>Email</label>
                <input
                  type="text"
                  name="emp_email"
                  style={{ width: "90%" }}
                  value={emp_email}
                  required
                  onChange={(e) => { setEmp_email(e.target.value) }}
                />
                <span className="text-danger">{errors.emp_email}</span>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label style={{ fontWeight: "bold" }}>Password</label>
                <input
                  type="password"
                  name="emp_psw"
                  style={{ width: "90%" }}
                  value={emp_psw}
                  required
                  onChange={(e) => { setEmp_psw(e.target.value) }}
                />
                <span className="text-danger">{errors.emp_psw}</span>
              </div>

              <div className="col-md-6 mt-md-0 mt-3">
                <label style={{ fontWeight: "bold" }}>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  style={{ width: "90%" }}
                  value={confirmPassword}
                  required
                  onChange={(e) => { setConfirmPassword(e.target.value) }}
                />
                <span className="text-danger">{errors.confirmPassword}</span>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mt-md-0 mt-3">
                <label style={{ fontWeight: "bold" }}>Address</label>
                <textarea
                  name="emp_address"
                  style={{ width: "95%" }}
                  value={emp_address}
                  required
                  onChange={(e) => { setEmp_address(e.target.value) }}
                ></textarea>
                <span className="text-danger">{errors.emp_address}</span>
              </div>
            </div>
            <button id="submitForm" className='text-center btn btn-success' onClick={handlesubmit} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Data"}
            </button>
            <br /><br />
            {errorMessage && <div id="error-message" className="text-danger" style={{ fontWeight: 'bold' }}>{errorMessage}</div>}
          </div>
        </div>
      )}
    </>
  );
};

export default AddEmployee;