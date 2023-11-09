import axios from 'axios';

export const getEmpName = async () => {
    try {
        const response = await axios.get('/api/emp_names');
        console.log('API Response:', response.data); // Log the response data
        return response.data;
    } catch (error) {
        console.error('API Error:', error); // Log any errors
        throw error;
    }
};