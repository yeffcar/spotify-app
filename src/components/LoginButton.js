// LoginButton.js
import React from 'react';
import { AUTH_ENDPOINT, SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, RESPONSE_TYPE, SCOPES } from '../Config';

const LoginButton = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    const loginUrl = `${AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPES)}`;
    window.location.replace(loginUrl);
  };

  return (
    <button onClick={(event)=> handleLogin(event)} className="login-button">
      Login with Spotify
    </button>
  );
};

export default LoginButton;
