import axios from 'axios';

export const getUserName = async (userEmail) => {
  try {
    const response = await axios.post('/api/adminName', { userEmail });
    return response.data;
  } catch (error) {
    throw error;
  }
};
