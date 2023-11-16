import axios from 'axios';

export const getUserName = async (userEmail) => {
  try {
    const response = await axios.post('/api/managerName', { userEmail });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCalendarInfo = async () => {
  try {
    let url = "http://localhost:5000/api/calendar/fetch-events";
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getCalendarInfoByShiftID = async (shiftID) => {
  try {
    let url = "http://localhost:5000/api/calendar/fetch-events/" + shiftID;
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

