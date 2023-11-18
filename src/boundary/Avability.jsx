import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { availability } from '../controller/availabilityController';

function Availability(props) {
  const [weeks, setWeeks] = useState([]); // State to store weeks
  const [selectedDates, setSelectedDates] = useState([]); // State to store selected dates
  const [empId, setEmpId] = useState("");
const [newdates,setNewdate]=useState([])
  useEffect(() => {
    // Fetch user data (replace with your API endpoint)
    axios.get(`/api/employee/${props.userEmail}`)
      .then((response) => {
        console.log(response.data);
        setEmpId(response.data.emp_id);

        // Chain the second request inside the first .then()
        return axios.get(`/api/employees/${response.data.emp_id}`);
      })
      .then((response) => {
        console.log(response.data);
        setSelectedDates(response.data.dates);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [props.userEmail]);

  useEffect(() => {
    // When selectedDates change, update the checkboxes in all weeks
    updateWeeks();
  }, [selectedDates]);

  // Function to update the weeks with checkboxes
  const updateWeeks = () => {
    setWeeks((prevWeeks) => {
      return prevWeeks.map((week) => {
        week.days = getDaysOfWeek(week.startDate);
        return week;
      });
    });
  };

  // Function to add a new week
  const addWeek = () => {
    if (weeks.length === 0) {
      // If there are no weeks, create the first one starting from next Sunday
      const startDate = moment().startOf('week').add(7, 'days');
      const endDate = startDate.clone().endOf('week');
      const newWeek = {
        startDate,
        endDate,
        days: getDaysOfWeek(startDate),
      };
      setWeeks([newWeek]);
    } else {
      // Add a new week starting from the last end date
      const lastWeek = weeks[weeks.length - 1];
      const startDate = lastWeek.endDate.clone().add(1, 'days');
      const endDate = startDate.clone().endOf('week');
      const newWeek = {
        startDate,
        endDate,
        days: getDaysOfWeek(startDate),
      };
      setWeeks((prevWeeks) => [...prevWeeks, newWeek]);
    }
  };
  

  // Function to get days of the week (e.g., "Sun", "Mon", ...)
  const getDaysOfWeek = (startDate) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = startDate.clone().add(i, 'days');
      const dayName = date.format('ddd');
      const isChecked = selectedDates.includes(date.format('YYYY-MM-DD'));
      days.push({ date: date.format('YYYY-MM-DD'), name: dayName, isChecked });
    }
    return days;
  };

  // Function to handle checkbox click
  const handleCheckboxChange = (date, isChecked) => {
    setSelectedDates((prevSelectedDates) => {
      if (isChecked) {
        // Remove the date from the list
        return prevSelectedDates.filter((d) => d !== date);
      } else {
        // Add the date to the list
        return [...prevSelectedDates, date];
      }
    });
    setNewdate((prevNewDates) => {
      if (isChecked) {
        // Remove the date from the list
        return prevNewDates.filter((d) => d !== date);
      } else {
        // Add the date to the list
        return [...prevNewDates, date];
      }
    });
  };




 console.log(newdates)
// Function to render checkboxes for a day
const renderCheckboxes = (day) => {
  const date = day.date;
  const isChecked = day.isChecked;
  const dayName = moment(date).format('ddd');

  // Disable checkboxes for Saturday and Sunday
  const isDisabled = dayName === 'Sat' || dayName === 'Sun';

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={() => handleCheckboxChange(date, isChecked)}
      disabled={isDisabled}
    />
  );
};

  const handleSubmit = () => {
    // You can make a POST request using Axios here
    /*
    axios.post('/api/postavailable', { emp_id: empId, date: newdates })
      .then(response => {
        console.log('Data posted successfully:', response.data);
        // You can add further handling here if needed
        alert('Data posted successfully');
      })
      .catch(error => {
        console.error('Error posting data:', error);
        // Handle the error appropriately
      });*/
      availability( empId, newdates)
      .then(() => {
        alert('Data posted successfully');
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

  const handleGoBack = () => {
    window.history.back(); // This will take the user back to the previous page
  };

  return (
    <div>
    <div className="container create-account" style = {{background: 'linear-gradient(to bottom, green, #395144', borderRadius: '15px', border: '1.5px solid black'}}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <p style={{ color: 'white', fontSize: '2rem'}}>
          Please check the box on the days you are available to work.
        </p>
      </div>
        <div className='bg-light mt-4'>
        {weeks.map((week, index) => (
        <div key={index} className="mt-5">
          <table className="availability-table">
            <thead>
              <tr style ={{background: '#E8FFCE'}}>
                <th colSpan="7">
                  Week of {week.startDate.format('DD/MM/YYYY')} - {week.endDate.format('DD/MM/YYYY')}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {week.days.map((day) => (
                  <td key={day.date}>
                    <label>
                      {day.name}
                    </label>
                  </td>
                ))}
              </tr>
              <tr>
                {week.days.map((day) => (
                  <td key={day.date}>
                    <label>
                      {renderCheckboxes(day)}
                    </label>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ))}
</div>
     
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button id="addWeek" className='btn btn-light text-dark' style={{border: '1.5px solid black'}} onClick={addWeek}><strong>+</strong></button><br></br>
        <button id="submitForm" onClick={handleSubmit} className='btn btn-light btn-success mt-3' style={{border: '1.5px solid black'}}>Submit</button>
      </div>
    </div>
    <button onClick={handleGoBack} className='btn btn-outline-dark m-4'><i class="ri-arrow-left-line"></i>Previous page</button>
    </div>
  );
}


export default Availability;
