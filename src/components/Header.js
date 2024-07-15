import React from 'react';
import PropTypes from 'prop-types';
import LoginButton from './LoginButton'; 
import LogoutButton from './LogoutButton'; 
import SearchBar from './SearchBar'; 

const Header = ({ logoUrl, onUpdateStyle, onLogout, isAuthenticated, accessToken, onSearch }) => {
  return (
    <header className="header">
      {logoUrl && <img src={logoUrl} alt="Logo" className="logo" />}
      {isAuthenticated && <SearchBar accessToken={accessToken} onSearch={onSearch} />}
      <button onClick={onUpdateStyle} className="update-style-button">Update Styles</button>
      {isAuthenticated ? (
        <LogoutButton onLogout={onLogout} />
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
