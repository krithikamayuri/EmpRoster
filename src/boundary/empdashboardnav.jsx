import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import nothing from "../images/notfound.jpg";
import { notifyShiftEmployee } from "../controller/notifyShiftEmployeeController";

function Empdashboardnav(props){
console.log(props.employeeId)
const[date, setDate]=useState([])
const checkShiftNotifications = async () => {
  try {
    const response = await notifyShiftEmployee(props.employeeId);
    setDate(response);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
useEffect(()=>{
checkShiftNotifications()
},[])

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

    return(
        <>
        <div className="employee-container" style={{ background: 'linear-gradient(to right, green, #395144' , padding: '10px', borderBottom: '2px solid black', borderTop: '2px solid black' }}>
          <h3 className="ever mt-2" style={{ color: 'white', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
            EverGreen Solutions
          </h3>
          <div className="admin" style={{ textAlign: 'center' }}>
            <p className="text" style={{ color: 'white', fontFamily: 'Verdana, sans-serif', fontSize: '18px', marginRight: '10px' }}>
              Employee
            </p>
            <style>
              {`
                .logout-link:hover h5 {
                  color: black;
                }
              `}
            </style>

          </div>
        </div>


        <nav className="navbar navbar-expand-lg" style ={{background: 'linear-gradient(to bottom, #AA8B56, #876445)', marginTop: '0px', borderBottom: '2px solid black'}}>
          <div className="container-fluid">
          <Link className="navbar-brand text-light" to="/">Calendar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
                <li className="nav-item">
                  <Link className="nav-link" to="/availibility">Submit availibility</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cancelshiftrequest">Cancel shift/submit MC</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/timetracker">Clock in/out</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/swaprequest">Swap Shift</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/myswaprequest">Approve/Deny swap shift</Link>
                </li>
                <li className="nav-item">
                <Link type="button" class=" position-relative mt-2 text-light mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style={{fontSize:"large",textDecoration:"none"}}>
                <i class="ri-notification-2-fill"></i>  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
  {date.length}
    <span class="visually-hidden">unread messages</span>
  </span>
</Link>                </li>
              
              </ul>
            
            </div>
          </div>
        </nav>
               

<div className="offcanvas offcanvas-end rounded mt-3 mb-3 mx-3" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div className="offcanvas-header ">
    <h5 id="offcanvasRightLabel " className="text-center">Your Upcoming Shift</h5>
    <button style={{backgroundColor:"none",border:"none"}} className=" text-reset" data-bs-dismiss="offcanvas" aria-label="Close"><i class="ri-corner-down-left-line"></i></button>
  </div>
  <div className="offcanvas-body">
  {date.length === 0 ? (
    <div className="text-center" style={{ width: "100%" }}>
      <img  src={nothing} style={{ width: "80%" }} alt="No shifts available" />
      <p className="text-center">Nothing Found</p>    <button style={{backgroundColor:"none",border:"none", float:"right"}} className=" text-reset" data-bs-dismiss="offcanvas" aria-label="Close"><i class="ri-corner-down-left-line"></i></button>

    </div>
  ) : (
    date.map((shift) => (
      <Link to="/cancelshiftrequest" key={shift.id} style={{ textDecoration: 'none' }}>
        <ul  style={{ listStyle: "none",alignItems:"center"}}>
          <li className="listitem p-2 ps-3 pb-1 rounded" style={{ cursor: "pointer" }}>
            <p style={{fontSize:"15px"}} className="text-dark mt-1"><span className="text-primary">{shift.emp_name}</span> You have a Shift on {formatDate(shift.shiftDate)}</p>
          </li>
        </ul>
      </Link>
    ))
  )}
</div>


</div>
        </>
    )
}
export default Empdashboardnav;