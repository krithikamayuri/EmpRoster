import React, { useState } from 'react';
import { adminDashboard } from '../controller/adminDashboardController';

function AdminDashboard() {

  const [selectedForm, setSelectedForm] = useState(null);

  const [emp_phoneno, setEmp_phoneno] = useState("");
  const [emp_psw, setEmp_psw] = useState("");
  const [emp_email, setEmp_email] = useState("");
  const [emp_name, setemp_name] = useState("");
  const [emp_address, setEmp_address] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emp_type, setemp_type] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Error state for each input field
  const [errors, setErrors] = useState({

    emp_phoneno: "",
    emp_psw: "",
    emp_email: "",
    emp_name: "",
    emp_address: "",
    confirmPassword: "",
  });

  const openForm = (formName, formemp_type) => {
    setSelectedForm(formName);
    setemp_type(formemp_type);
  };

  const closeForm = () => {
    setSelectedForm(null);
  };

  const handlesubmit = () => {
    // Clear previous errors
    setErrors({

      emp_phoneno: "",
      emp_psw: "",
      emp_email: "",
      emp_name: "",
      emp_address: "",
      confirmPassword: "",
    });

    if (isLoading) {
      return; // Prevent multiple submissions while the request is in progress
    }


    if (!emp_phoneno) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emp_phoneno: "Phone Number is required",
      }));
    }
    if (!emp_psw) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emp_psw: "Password is required",
      }));
    }
    if (!emp_email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emp_email: "Email is required",
      }));
    }
    if (!emp_name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emp_name: "Name is required",
      }));
    }
    if (!emp_address) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emp_address: "Address is required",
      }));
    }
    if (!confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Confirm Password is required",
      }));
    }

    if (emp_psw !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    if (Object.values(errors).some((error) => error)) {
      // If there are any errors, prevent form submission
      return;
    }



    const formdata = {

      emp_psw,
      emp_email,
      emp_name,
      emp_phoneno,
      emp_address,
      emp_type,
    };
    if (!emp_phoneno || !emp_psw || !emp_email || !emp_name || !emp_address || !confirmPassword) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    setIsLoading(true); // Set loading state to true
    //axios
    //  .post('/api/register-admins', formdata)
    adminDashboard(formdata)
      .then((response) => {
        console.log('Data saved successfully:', response.data);

        // Clear input fields after successful submission

        setEmp_psw("");
        setEmp_email("");
        setemp_name("");
        setEmp_phoneno("");
        setEmp_address("");
        setConfirmPassword("");

        setIsLoading(false);
        alert(response.data.msg);
      })
      .catch((error) => {
        setErrorMessage("Error saving data");
        console.error('Error saving data:', error);
        setIsLoading(false);
      });
  };


  return (
    <>
      <div className="main-container topGreenHeader text-white">
        <h3 className="mt-0 ">EverGreen Solutions</h3>
        <div className="admin">
          <p className="text-danger">System Admin</p>
          {/* <a href="/logout" style={{textDecoration:"none" , color:"white"}}><h5 style={{ lineHeight: "0.4", textAlign: "center" }}>Logout</h5></a>  */}
        </div>
      </div>
      <div className="container create-account">
        <button id="openForm" onClick={() => openForm('system', 'manager')} className={(emp_type === 'manager') ? 'active btn btn-outline-primary' : ''} >Create Manager Account</button>

        {/* Conditionally render the forms based on the selectedForm state */}
        {selectedForm === 'system' && (
          <div className="system-form mt-5" style={{ width: "70%", margin: "auto" }}>
            <h3 className='text-center'>Create Manager Account</h3>
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label style={{ fontWeight: "bold" }}>Full Name</label>
                <input
                  type="text"
                  name="emp_name"
                  style={{ width: "90%" }}
                  value={emp_name}
                  className='form-control'
                  required
                  onChange={(e) => { setemp_name(e.target.value) }}
                />
                <span className="text-danger">{errors.emp_name}</span> {/* Display error message */}
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label style={{ fontWeight: "bold" }}>Phone Number</label>
                <input
                  type="number"
                  name="emp_phoneno"
                  className='form-control'
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
                {emp_phoneno.length !== 8 && (
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
                  className='form-control'
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
                  className='form-control'
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
                  className='form-control'
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
                  className='form-control mb-2'
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
            <button className='text-end btn btn-danger' onClick={closeForm}>X</button>
            <br /><br />
            {errorMessage && <div id="error-message" className="text-danger" style={{ fontWeight: 'bold' }}>{errorMessage}</div>}
          </div>
        )}

      </div>
    </>
  );
}

export default AdminDashboard;
