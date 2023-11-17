import axios from 'axios';

export const getCancelShiftRequests = async () => {
  try {
    const response = await axios.get('/api/getCancelShiftRequests');

    if (response.data.status) {
      return response.data.data;
    } else {
      throw new Error('Failed to fetch shift cancellation requests');
    }
  } catch (error) {
    throw error;
  }
};