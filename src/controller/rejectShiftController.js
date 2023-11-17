import axios from 'axios';

export const rejectShiftRequest = async (requestId) => {
    try {
      const response = await axios.post(`/api/rejectRequest/${requestId}`);
  
      if (response.data.status) {
        return response.data;
      } else {
        throw new Error('Failed to reject shift request');
      }
    } catch (error) {
      throw error;
    }
  };