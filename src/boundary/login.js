//import React, { useState } from 'react';
import { login } from '../controller/loginController';
//import loginImage from "../images/login-small.jpg";
import logo from "../images/logo.png";
import loginImage from '../images/login-small.jpg';
const React = require('react');
//const { login } = require('../controller/loginController');

const Login = ({ onLogin }) => {
  const [userEmail, setUserEmail] = React.useState('');
  const [userPsw, setUserPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleUsernameChange = (event) => {
    setUserEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setUserPassword(event.target.value);
  }

  const handleLogin = async () => {
    try {
      const response = await login(userEmail, userPsw);

      if (response && response.message === 'Login successful') {
        // Authentication was successful
        // You can set user authentication state or redirect the user here
        console.log('Login successful');
        const userType = response.userTypes;
        const userEmail = response.userEmail;
        const employeeId = response.employee_id;
        onLogin(userType, userEmail, employeeId);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred. Please try again later.');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  }

  return (
    <div className="container h-100">
      <div className="loginBox mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div>
              <img src={loginImage} className="image-fluid w-100" alt=""/>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <div className="text-center">
                <img src={logo} alt="" style={{ width: "100px", margin: "auto", marginBottom: "20px", display: "inline-block" }} />
              </div>
              <h2 className="text-center">Welcome To Evergreen</h2>
              <p className="mb-5 text-center">a cleaning company roster</p>
              <h4 className="mb-3">Login</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="input-group">
                  <span class="input-group-text  px-4"><i class="ri-user-line"></i> </span>
                  <input
                    type="text"
                    placeholder="Email"
                    className="form-control py-3 shadow-none"
                    value={userEmail}
                    onChange={handleUsernameChange}
                    required
                  />
                  </div>
                  
                </div>

                <div className="mb-3">
                <div className="input-group">
                  <span class="input-group-text px-4"><i class="ri-lock-line"></i> </span>
                  <input
                    type="password"
                    className="form-control py-3 shadow-none"
                    placeholder="Password"
                    value={userPsw}
                    onChange={handlePasswordChange}
                    required
                  />
                  </div>
                </div>
                {error && <p className="error-message alert alert-danger">{error}</p>}
                <button type="submit" className="btn btn-dark w-100 py-3">Log In</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>

  );
}

export default Login;
