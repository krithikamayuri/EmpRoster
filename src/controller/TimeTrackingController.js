import axios from 'axios';

export const getEmployeeData = async (userEmail) => {
  try {
    const response = await axios.get(`/api/employee/${userEmail}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Propagate the error to the caller
  }
};

export const getClockInOutData = async (empId, date) => {
  try {
    const response = await axios.get(`/api/fetchClockInOut?empId=${empId}&date=${date}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching clock in/out data:', error);
    throw error; // Propagate the error to the caller
  }
};

export const recordClockIn = async (empId, date, clockIn) => {
  try {
    const response = await axios.post('/api/clockinout', { empId, date, clockIn });
    return response.data;
  } catch (error) {
    console.error('Error recording clock in time:', error);
    throw error; // Propagate the error to the caller
  }
};

export const updateClockOut = async (empId, date, clockOut) => {
  try {
    const response = await axios.post('/api/updateClockOut', { empId, date, clockOut });
    return response.data;
  } catch (error) {
    console.error('Error updating clock out time:', error);
    throw error; // Propagate the error to the caller
  }
};
