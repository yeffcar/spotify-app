// Header.js
import React from 'react';
import LoginButton from './LoginButton'; // Importa el componente LoginButton

const Header = ({ logoUrl, onUpdateStyle, onLogout, isAuthenticated }) => {
  return (
    <header className="header">
      {logoUrl && <img src={logoUrl} alt="Logo" className="logo" />}
      <button onClick={onUpdateStyle} className="update-style-button">Actualizar Estilos</button>
      {isAuthenticated ? (
        <button onClick={onLogout} className="logout-button">Cerrar Sesión</button>
      ) : (
        <LoginButton />
      )}
    </header>
  );
};

export default Header;
