/*
import axios from 'axios';

export const login = async (userEmail, userPsw) => {
  try {
    const response = await axios.post('/api/login', { userEmail, userPsw });
    return response.data;
  } catch (error) {
    throw error;
  }
};
*/

export const login = async (userEmail, userPsw) => {
  const url = '/api/login'; // Replace with the actual API endpoint URL

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userEmail, userPsw }),
  };

  try {
    const response = await fetch(url, requestOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
