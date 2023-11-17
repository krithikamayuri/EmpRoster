import axios from 'axios';

export const getClockInReports = async () => {
  try {
    const response = await axios.get('/api/clockInReports');

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.data.clockIns;
  } catch (error) {
    throw error;
  }
};
