// Header.js
import React from 'react';
import PropTypes from 'prop-types';
import LoginButton from './LoginButton'; // Importa el componente LoginButton
import SearchBar from './SearchBar'; // Importa el componente SearchBar

const Header = ({ logoUrl, onUpdateStyle, onLogout, isAuthenticated, accessToken, onSearch }) => {
  return (
    <header className="header">
      {logoUrl && <img src={logoUrl} alt="Logo" className="logo" />}
      {isAuthenticated && <SearchBar accessToken={accessToken} onSearch={onSearch} />}
      <button onClick={onUpdateStyle} className="update-style-button">Actualizar Estilos</button>
      {isAuthenticated ? (
        <button onClick={onLogout} className="logout-button">Cerrar Sesión</button>
      ) : (
        <LoginButton />
      )}
    </header>
  );
};

Header.propTypes = {
  logoUrl: PropTypes.string,
  onUpdateStyle: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  accessToken: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

export default Header;
