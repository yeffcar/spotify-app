// useSpotifyToken.js
import { useState, useEffect, useCallback } from 'react';
import { AUTH_ENDPOINT, SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, RESPONSE_TYPE, SCOPES } from '../Config';

const useSpotifyToken = () => {
  const [accessToken, setAccessToken] = useState(null);

  const renewToken = useCallback(() => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('expiry_time');
    window.location.href = `${AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${SPOTIFY_REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;
  }, []);

  const checkTokenExpiration = useCallback(() => {
    const expiryTime = window.localStorage.getItem('expiry_time');
    if (expiryTime) {
      const expiresIn = parseInt(expiryTime) - new Date().getTime();
      setTimeout(renewToken, expiresIn);
    }
  }, [renewToken]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (!token && hash) {
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
      const expiresIn = hash.substring(1).split('&').find(elem => elem.startsWith('expires_in')).split('=')[1];
      const expiryTime = new Date().getTime() + expiresIn * 1000;
      window.location.hash = '';
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('expiry_time', expiryTime);
      setAccessToken(token);
    } else {
      const expiryTime = window.localStorage.getItem('expiry_time');
      if (expiryTime && new Date().getTime() > parseInt(expiryTime)) {
        renewToken();
      } else {
        setAccessToken(token);
        checkTokenExpiration();
      }
    }
  }, [renewToken, checkTokenExpiration]);

  return accessToken;
};

export default useSpotifyToken;
