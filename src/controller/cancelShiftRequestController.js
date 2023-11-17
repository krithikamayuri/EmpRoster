import axios from 'axios';

export const cancelShiftRequest = async (formData) => {
    const url = '/api/cancelShiftRequest';
  
    try {
      const response = await axios.post(url, formData);
  
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };