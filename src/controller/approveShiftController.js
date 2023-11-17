import axios from 'axios';

export const approveShiftRequest = async (requestId) => {
    try {
      const response = await axios.post(`/api/approveRequest/${requestId}`);
  
      if (response.data.status) {
        return response.data;
      } else {
        throw new Error('Failed to approve shift request');
      }
    } catch (error) {
      throw error;
    }
  };