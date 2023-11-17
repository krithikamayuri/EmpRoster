export const login = async (userEmail, userPsw) => {
  const url = 'http://localhost:5000/api/login'; // Replace with the actual API endpoint URL

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userEmail, userPsw }),
  };

  try {
    console.log("loginController " + "url: " + url)
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
