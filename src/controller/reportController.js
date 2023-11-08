import axios from 'axios';

export const getEmpName = async () => {
    try {
        const response = await axios.get('/api/emp_names');
        console.log('API Response:', response.data); // Log the response data
        return response.data;
    } catch (error) {
        console.error('API Error:', error); // Log any errors
        throw error;
    }
};

export const compareTimings = async (empId, date) => {
    try {
        const response = await axios.get(`/api/findLateTime/${empId}/${date}`);
        console.log('API Response:', response.data); // Log the response data
        return response.data;
    } catch (error) {
        console.error('API Error:', error); // Log any errors
        throw error;
    }
};

export const fetchEmpIdAndDate = async () => {
    return fetch('/api/getEmpIdAndDate')
      .then((response) => response.json())
      .catch((err) => {
        throw new Error('Error fetching empId and date: ', err);
      });
  };