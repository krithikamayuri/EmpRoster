import { Link } from "react-router-dom";


function Empdashboardnav(){
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