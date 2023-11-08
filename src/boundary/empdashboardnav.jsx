import { Link } from "react-router-dom";


function Empdashboardnav() {
  return (
    <>
      <div className="employee-container">
        <h3 className="ever mt-2">EverGreen Solutions</h3>
        <div className="admin">
          <p className="text-danger">Employee</p>
          {/* <a href="/logout" style={{ textDecoration: "none", color: "white" }}>
            <h5 style={{ lineHeight: "0.4", textAlign: "center" }}>Logout</h5>
          </a> */}
        </div></div>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand text-light" to="/availabilitysub">Calender</Link>
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

            </ul>

          </div>
        </div>
      </nav>

    </>
  )
}
export default Empdashboardnav;