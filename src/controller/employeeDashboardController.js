import axios from 'axios';

export const employeeDashboardController = async (userEmail) => {
  try {
    const response = await axios.post('/api/employeeName', { userEmail });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all employees
export const getEmployeesAsync = async () => {
  try {
    const response = await axios.get("/api/getEmployees");
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const getCalendarInfo = async (empId) => {
  try {
    let url = "/api/calendar/fetch-events/" + empId;
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getCalendarInfoByShiftID = async (shiftID) => {
  try {
    let url = "/api/calendar/fetch-shift/" + shiftID;
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get all shifts by employee
export const getShiftsByEmployee = async (empId) => {
  try {
    const response = await axios.get(`/api/getemployeeshifts/${empId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get employee by email
export const getEmployeeByEmailAsync = async (email) => {
  try {
    const response = await axios.get(`/api/getEmployeeByEmail/${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get swap shift requests by employee id
export const getSwapShiftRequestsAsync = async (employeeId) => {
  try {
    const response = await axios.get(`/api/getSwapShiftRequests/${employeeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// create swap request
export const createShiftSwapRequest = async (data) => {
  try {
    const response = await axios.post("/api/createShiftSwapRequest", {data});
    return response.data;
  } catch (error) {
    throw error;
  }
}

// update state of swap shift request
export const updateSwapShiftRequest = async (data) => {
  try {
    const response = await axios.post("/api/updateSwapShiftRequest", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
