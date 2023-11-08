import "./App.css"
import React, { useState } from 'react';
//import Calendar from './boundary/calendar';
import Login from './boundary/login';
import AdminDashboard from './boundary/adminDashboard';
import EmployeeDashboard from './boundary/employeeDashboard';
import ManagerDashboard from './boundary/managerDashboard';
import Management from "./boundary/Management";
import logo from "./images/logo.png"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [employeeId, setEmployeeId] = useState(null);

  // Function to handle login
  const handleLogin = (type, email, employeeId) => {
    setIsLoggedIn(true);
    setUserType(type);
    setUserEmail (email);
    setEmployeeId(employeeId)
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic here
    // If logout is successful, set isLoggedIn to false
    setIsLoggedIn(false);
    setUserType('');
    setUserEmail ('');
  };

return (
  <div>
    {isLoggedIn ? (
      <div className="container">
        <div>
          <img src={logo} style={{ width: "40px", float: "left", marginTop: "2px", marginRight: "10px" }}  />
        </div>
        <div className="text-end float-end">
          <button onClick={handleLogout} className="btn btn-danger btn-sm mt-1">
          <i class="ri-logout-circle-line"></i> Logout</button>
        </div>
        {userType === 'employee' && (
          <div>
            <EmployeeDashboard userEmail={userEmail} employeeId={employeeId}/>
          </div>
        )}
        {userType === 'manager' && (
          <div>
            <ManagerDashboard userEmail={userEmail}/>
          </div>
        )}
        {userType === 'admin' && (
          <div>
            <AdminDashboard userEmail={userEmail}/>
          </div>
        )}
        {userType === 'superAdmin' && (
          <div>
            <h2>Welcome to the Manager Dashboard, {userEmail}</h2>
            <Management userEmail={userEmail}/>
          </div>
        )}
        {/*<Calendar />*/}
      </div>
    ) : (
      <div>
        <Login onLogin={handleLogin} />
      </div>
    )}
  </div>
);
}

export default App;
