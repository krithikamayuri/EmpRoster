//import React, { useState } from 'react';
//import { login } from '../controller/loginController';

const React = require('react');
const { login } = require('../controller/loginController');

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={userEmail}
          onChange={handleUsernameChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userPsw}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Log In</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Login;
