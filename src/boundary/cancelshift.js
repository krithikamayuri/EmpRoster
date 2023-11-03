import React from 'react';

const Cancellation = () => {
  const handleGoBack = () => {
    window.history.back(); // This will take the user back to the previous page
  };

  return (
    <div>
      <h1>Please pick your selected schedule</h1>
      <p>Submit MC here</p>
      <button onClick={handleGoBack}>Previous page</button>
    </div>
  );
};

export default Cancellation;
