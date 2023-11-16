export const assignEmployees = async (weekData) => {
  const url = '/api/assign-employees';
  
  const assignEmployees = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ weekData }),
  };

  try {
    const response = await fetch(url, assignEmployees);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
