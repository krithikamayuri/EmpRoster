//manager navbar
import React from 'react';
import { Link } from 'react-router-dom';


const ManagerNavbar = () => {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/report">Generate Reports</Link>
          </li>
        </ul>
      </nav>
    );
  };
  
export default ManagerNavbar;
  
