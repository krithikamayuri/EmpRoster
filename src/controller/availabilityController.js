import axios from "axios";

export const availability = async (empId, newDates) => {
    try {
      const response = await axios.post('/api/postavailable', { emp_id: empId, date: newDates });
      console.log('Data posted successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };
