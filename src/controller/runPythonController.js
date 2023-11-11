export const runPython = async () => {
    const url = '/api/runPy';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  