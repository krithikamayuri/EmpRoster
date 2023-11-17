import axios from 'axios';

export const registerAdmin = async (formData) => {
    try {
      const response = await axios.post('/api/register-admins', formData);
  
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };