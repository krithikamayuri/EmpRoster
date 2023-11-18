import axios from 'axios';

export const employeeReport = async (Emp_Name) => {
  try {
    const response = await axios.get('/api/hoursWorked', {
      params: { Emp_Name },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllShiftCancelRequests = async () => {
  try{
    const response = await axios.get('/api/shiftCancelRequests',)
    return response.data;
  } catch(error) {
    throw(error);
  }
}