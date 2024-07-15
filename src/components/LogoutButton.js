import React from 'react';
import PropTypes from 'prop-types';

const LogoutButton = ({ onLogout }) => {
  const handleLogoutClick = (event) => {
    event.preventDefault();
    onLogout();
  };

  return (
    <button onClick={(event)=> handleLogoutClick(event)} className="logout-button">
      LogOut
    </button>
  );
};

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default LogoutButton;
