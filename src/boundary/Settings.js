import React, { useState, useEffect, useCallback } from 'react';
import './public/css/settings.css';
import credentialsData from './public/credentials.json';

function Settings() {
  const [accessToken, setAccessToken] = useState(null);
  const [authorizationComplete, setAuthorizationComplete] = useState(false);

  const redirectToGoogleAuthEndpoint = () => {
    const { clientId, redirectUri } = credentialsData;
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}&` +
      `scope=https://www.googleapis.com/auth/calendar&` +
      `response_type=code`;

    console.log('Redirecting to Google OAuth:', authUrl);

    // Open the authorization URL in a new tab
    window.open(authUrl, '_blank');
  };

  const handleRedirect = useCallback(async () => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (code) {
      console.log('Authorization code received:', code);

      try {
        const response = await fetchAccessToken(code);
        console.log('Access token obtained:', response.access_token);
        setAccessToken(response.access_token);

        // Optional: You can clear the code from the URL to avoid confusion
        window.history.replaceState({}, document.title, window.location.pathname);

        // Set the state to indicate that authorization is complete
        setAuthorizationComplete(true);
      } catch (error) {
        console.error('Failed to fetch access token:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Trigger handleRedirect when the component mounts
    handleRedirect();
  }, [handleRedirect]);

  const fetchAccessToken = async (code) => {
    const { clientId, clientSecret, redirectUri } = credentialsData;
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `code=${code}&
        client_id=${clientId}&
        client_secret=${clientSecret}&
        redirect_uri=${redirectUri}&
        grant_type=authorization_code`,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch access token: ${response.statusText}`);
    }

    return response.json();
  };

  const useAccessToken = async () => {
    // Use the access token to make authorized API calls
    // ...
  };

  return (
    <div>
      <h1>Settings</h1>
      {authorizationComplete ? (
        <div>
          {accessToken ? (
            <div>
              <span>You are successfully bound</span>
              <button onClick={useAccessToken}>Get my events</button>
            </div>
          ) : (
            <div className="form">
              <span>Authorization complete, but access token is missing.</span>
              <br />
              <br />
            </div>
          )}
        </div>
      ) : (
        <div className="form">
          <button
            className="button"
            onClick={() => redirectToGoogleAuthEndpoint()}
          >
            Bind
          </button>
          <span>You need to bind your account first</span>
          <br />
          <br />
        </div>
      )}
    </div>
  );
}

export default Settings;
