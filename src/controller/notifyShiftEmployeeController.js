import axios from 'axios';

export const notifyShiftEmployee = async (employeeId) => {
  const url = `/api/notifyshiftemployee/${employeeId}`;

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
