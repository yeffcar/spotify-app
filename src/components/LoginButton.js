// LoginButton.js
import React from 'react';
import { AUTH_ENDPOINT, SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, RESPONSE_TYPE, SCOPES } from '../Config'; // Ajusta la importación según tu estructura de archivos y configuración

const LoginButton = () => {
  const handleLogin = () => {
    // Redirigir al usuario a la página de inicio de sesión de Spotify
    const loginUrl = `${AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPES)}`;
    window.location.replace(loginUrl);
  };

  return (
    <button onClick={handleLogin} className="login-button">
      Iniciar Sesión con Spotify
    </button>
  );
};

export default LoginButton;
