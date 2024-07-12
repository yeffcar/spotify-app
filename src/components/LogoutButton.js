// LogoutButton.js
import React from 'react';
import PropTypes from 'prop-types';

const LogoutButton = ({ onLogout }) => {
  const handleLogoutClick = () => {
    onLogout();
  };

  return (
    <button onClick={handleLogoutClick} className="logout-button">
      Cerrar Sesión
    </button>
  );
};

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default LogoutButton;
