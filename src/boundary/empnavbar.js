import React from 'react';
import { Link } from 'react-router-dom';

const EmpNavbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/availabilitysub">Submit Availability</Link>
        </li>
        <li>
            <Link to="/cancelshift"> Cancel Shift</Link>
        </li>
        <li>
            <Link to="/swaprequest"> Swap Shift</Link>
        </li>
      </ul>
    </nav>
  );
};

export default EmpNavbar;
