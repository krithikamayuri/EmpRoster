import axios from 'axios';

export const fetchShifts = async (employeeId) => {
    const url = `/api/fetchShifts/${employeeId}`;
  
    try {
      const response = await axios.get(url);
  
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const fetchCancelRequests = async (employeeId) => {
    const url = '/api/checkCancelRequests/' + employeeId;
  
    try {
      const response = await axios.get(url);
  
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };
