import axios from 'axios';

export const addEmployee = async (addEmployee) => {
  const url = '/api/createEmployee';

  try {
    const response = await axios.post(url, addEmployee);

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    throw error;
  }
};
