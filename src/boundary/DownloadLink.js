import React from 'react';

const DownloadLink = ({ filename }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(`/uploads/${filename}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <a href="#" onClick={handleDownload}>
      {filename}
    </a>
  );
};

export default DownloadLink;
