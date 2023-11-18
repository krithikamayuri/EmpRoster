import axios from 'axios';

export const adminDashboard = async (formData) => {
  const url = '/api/register-admins';

  try {
    const response = await axios.post(url, formData);

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    throw error;
  }
};
